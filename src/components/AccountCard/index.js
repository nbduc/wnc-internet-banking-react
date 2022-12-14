import {
    Card,
    CardHeader,
    IconButton,
    CardContent,
    Typography,
    Box,
    Menu,
    MenuItem,
    Slide,
    Dialog,
    AppBar,
    Toolbar,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { useState, forwardRef, useEffect } from "react";
import TransactionHistoryList from "../TransactionHistoryList";
import { accountApiSlice } from "../../features/Account/accountApiSlice";
import { currencyFormatter } from "../../common";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AccountCard({ accountName, accountNumber, accountBalance }) {
    const [
        getTransactionHistoryByAccountNumber,
        { isFetching, data: transactionHistoryResponse, isSuccess }
    ] = accountApiSlice.endpoints.getTransactionHistoryByAccountNumber.useLazyQuery();

    const [transactionHistory, setTransactionHistory] = useState([]);

    useEffect(() => {
        if (isSuccess) {
            setTransactionHistory(transactionHistoryResponse);
        }
    }, [isSuccess, transactionHistoryResponse]);

    const [anchorEl, setAnchorEl] = useState(null);
    const actionListOpen = Boolean(anchorEl);
    const actionListHandleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const actionListHandleClose = () => {
        setAnchorEl(null);
    };

    const [transactionHistoryOpen, setOpen] = useState(false);
    const transactionHistoryHandleClickOpen = async () => {
        setOpen(true);
        getTransactionHistoryByAccountNumber(accountNumber);
    };
    const transactionHistoryHandleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Card variant="outlined">
                <CardHeader
                    title={accountName}
                    action={
                        <IconButton
                            aria-label="settings"
                            onClick={actionListHandleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    }
                ></CardHeader>
                <CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            S??? t??i kho???n
                        </Typography>
                        <Typography variant="body" color="text.primary">
                            {accountNumber}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            S??? d?? hi???n t???i
                        </Typography>
                        <Typography variant="body" color="text.primary">
                            {currencyFormatter(accountBalance)}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={actionListOpen}
                onClose={actionListHandleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem
                    onClick={async (e) => {
                        actionListHandleClose(e);
                        transactionHistoryHandleClickOpen(e);
                    }}
                >
                    L???ch s??? giao d???ch
                </MenuItem>
            </Menu>

            <Dialog
                fullScreen
                open={transactionHistoryOpen}
                onClose={transactionHistoryHandleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={transactionHistoryHandleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            L???ch s??? giao d???ch
                        </Typography>
                    </Toolbar>
                </AppBar>
                <TransactionHistoryList history={transactionHistory} loading={isFetching}></TransactionHistoryList>
            </Dialog>
        </>
    );
}

export default AccountCard;
