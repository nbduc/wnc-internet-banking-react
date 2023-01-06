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
import { LoadingButton } from "@mui/lab";
import { usePayDebtMutation } from "../../features/PaymentRequest/paymentRequestApiSlice";
import { useLazyGetAccountByAccountNumberQuery } from "../../features/Account/accountApiSlice";
import OtpDialog from "../OtpDialog";
import MessageAlert from "../MessageAlert";

function PaymentFormDialog({ debt }) {
    const [payDebt, {isLoading, isError, isSuccess}] = usePayDebtMutation();

    const [getAccountByAccountNumber] = useLazyGetAccountByAccountNumberQuery();
    const [currentBalance, setCurrentBalance] = React.useState(0);
    const [msg, setMsg] = React.useState("");
    const [otpDialogOpen, setOtpDialogOpen] = React.useState(false);
    const [orderNumber, setOrderNumber] = React.useState("");

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

    const handleOtpDialogClose = (event, reason) => {
        if (reason && reason === "backdropClick") return;
        setOtpDialogOpen(false);
        setOpen(false);
    };

    const canSubmit = currentBalance - debt.amount >= 0;
    const handleSubmit = async () => {
        try {
            const response = await payDebt(debt.id).unwrap();
            response.message ? setMsg(response.message) : setMsg("");
            setOrderNumber(response.data);
            setOtpDialogOpen(true);
        } catch (err) {
            setMsg('');
            if (err.message) {
                setMsg(err.message);
            } else if(!err.success && err.data){
                setMsg(err.data?.errors?.join('</br>'));
            } else {
                setMsg("Không thể thực hiện.");
            }
        }
    }

    return (
        <>
            {(isError || isSuccess) &&
                <MessageAlert
                    message={msg}
                    hidden={false}
                    severity={isError? "error" : "success"}
                ></MessageAlert>
            }
            <OtpDialog orderNumber={orderNumber} open={otpDialogOpen} onClose={handleOtpDialogClose}></OtpDialog>
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
                        loading={isLoading}
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                    >Thanh toán</LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PaymentFormDialog;
