import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import PaymentsIcon from "@mui/icons-material/Payment";
import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { currencyFormatter } from "../../common";
import { accountApiSlice } from "../../features/Account/accountApiSlice";
import { LoadingButton } from "@mui/lab";

function PaymentFormDialog({ debt }) {
    const [getAccountByAccountNumber] = accountApiSlice.endpoints.getAccountByAccountNumber.useLazyQuery();
    const [currentBalance, setCurrentBalance] = React.useState(0);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = async () => {
        setOpen(true);
        try {
            const response = await getAccountByAccountNumber(debt.accountNumber);
            setCurrentBalance(response.data?.data?.currentBalance);
        }
        catch (err) {
            console.log(err);
        }
    };

    const handleClose = (event, reason) => {
        if (reason && reason === "backdropClick") return;
        setOpen(false);
    };

    const canSubmit = currentBalance - debt.amount >= 0;

    return (
        <>
            <Tooltip title="Thanh toán nợ">
                <IconButton color="primary" onClick={handleClickOpen}>
                    <PaymentsIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Tiến hành thanh toán</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Thông tin nợ
                    </DialogContentText>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <List sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper' }}>
                            <ListItem>
                                <ListItemText primary="Tên người nhắc nợ" secondary={debt.fromCustomer} />
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <ListItemText primary="Gửi nhắc nợ tới" secondary={`${debt.accountName} - ${debt.accountNumber}`} />
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <ListItemText primary="Số tiền" secondary={currencyFormatter(debt.amount)} />
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <ListItemText primary="Số dư hiện tại" secondary={currencyFormatter(currentBalance)} />
                            </ListItem>
                        </List>
                        {!canSubmit &&
                            <Typography variant="body1" color="red">
                                Số dư hiện tại không đủ để thanh toán.
                            </Typography>
                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <LoadingButton
                        onClick={handleClose}
                        disabled={!canSubmit}
                    >Thanh toán</LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PaymentFormDialog;
