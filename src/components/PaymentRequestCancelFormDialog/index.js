import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDeletePaymentRequestMutation } from "../../features/PaymentRequest/paymentRequestApiSlice";
import MessageAlert from "../MessageAlert";

function PaymentRequestCancelFormDialog({id}) {
    const [deletePaymentRequest, { isLoading, isSuccess, isError }] = useDeletePaymentRequestMutation();
    const [msg, setMsg] = React.useState('');

    const [remark, setRemark] = React.useState('');
    const handleRemarkInput = (e) => {
        setRemark(e.target.value);
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason && reason === "backdropClick") return;
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await deletePaymentRequest({id, remark}).unwrap();
            setMsg("Đã xóa nhắc nợ.");
        } catch (err) {
            setMsg('');
            if(!err.success){
                setMsg(err.data.errors?.join('</br>'));
            } else {
                setMsg("Không thể thực hiện.");
            }
        }
        setOpen(false);
        setRemark('');
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
            <Tooltip title="Hủy nhắc nợ">
                <IconButton color="secondary" onClick={handleClickOpen}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Hủy nhắc nợ</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            fullWidth
                            multiline
                            minRows={4}
                            placeholder="Nội dung"
                            autoFocus
                            value={remark}
                            onChange={handleRemarkInput}
                        ></TextField>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Thoát</Button>
                    <LoadingButton
                        onClick={handleSubmit}
                        loading={isLoading}
                    >OK</LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PaymentRequestCancelFormDialog;
