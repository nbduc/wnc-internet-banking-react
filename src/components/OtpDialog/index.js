import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import MessageAlert from "../MessageAlert";
import { useConfirmOtpMutation } from "../../features/Transfer/transferApiSlice";

function OtpDialog({orderNumber, open, onClose}) {
    const [otp, setOtp] = React.useState("");
    const [msg, setMsg] = React.useState("");
    const handleOtpInput = (event) => {
        setOtp(event.target.value);
    }

    const canSubmit = otp ? true : false;
    const [confirmOtp, { isLoading, isError, isSuccess }] = useConfirmOtpMutation();

    const handleSubmit = async () => {
        try {
            await confirmOtp({
                orderNumber,
                otp
            }).unwrap();
            setMsg("Chuyển khoản thành công.");
            setOtp("");
            onClose();
        } catch (err) {
            setMsg("Không thể chuyển khoản.");
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
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>Nhập mã OTP</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Vui lòng nhập mã OTP tại đây.
                    </DialogContentText>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            fullWidth
                            placeholder="Mã OTP"
                            autoFocus
                            value={otp}
                            onChange={handleOtpInput}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Hủy</Button>
                    <LoadingButton
                        loading={isLoading}
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                    >OK</LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default OtpDialog;