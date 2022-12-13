import {
    Button,
    Box,
    TextField,
    CssBaseline,
    Typography,
    Container,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useChangePasswordMutation } from "../../features/User/userApiSlice";
import MessageAlert from "../../components/MessageAlert";

function ChangePasswordPage(props) {
    const [changePassword, {isLoading, isSuccess}] = useChangePasswordMutation();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [msg, setMsg] = useState('');

    const navigate = useNavigate();

    const handleCurrentPasswordInput = (event) => {
        setCurrentPassword(event.target.value);
    }
    const handleNewPasswordInput = (event) => {
        setNewPassword(event.target.value);
    }
    const handleConfirmPasswordInput = (event) => {
        setConfirmPassword(event.target.value);
    }

    const canSubmit = currentPassword && newPassword && confirmPassword;

    const resetStates = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setMsg('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await changePassword({ oldPassword: currentPassword, newPassword, confirmPassword }).unwrap();
            resetStates()
            setMsg('Đổi mật khẩu thành công.');
        } catch (err) {
            resetStates();
            if (!err?.status) {
                setMsg("Lỗi máy chủ.");
            } else if(err?.status){
                setMsg(err.data.message);
            } else {
                setMsg("Không thể thay đổi mật khẩu hiện tại.");
            }
        }
    };

    const handleBackButton = (event) => {
        navigate(-1);
    }
    return (
        <>
            {msg.length !== 0 && (
                <MessageAlert
                    message={msg}
                    hidden={false}
                    severity={isSuccess? "success" : "error"}
                ></MessageAlert>
            )}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100vh",
                }}
            >
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <Typography component="h1" variant="h4">
                            Thay đổi mật khẩu
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1, width: "100%" }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="current-password"
                                label="Mật khẩu hiện tại"
                                type="password"
                                id="current-password"
                                autoComplete="current-password"
                                autoFocus
                                value={currentPassword}
                                onChange={handleCurrentPasswordInput}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="new-password"
                                label="Mật khẩu mới"
                                type="password"
                                id="new-password"
                                autoComplete="new-password"
                                value={newPassword}
                                onChange={handleNewPasswordInput}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirm-password"
                                label="Nhập lại Mật khẩu"
                                type="password"
                                id="confirm-password"
                                autoComplete="confirm-password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordInput}
                            />
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                loading={isLoading}
                                disabled={!canSubmit}
                            >
                                Thay đổi
                            </LoadingButton>
                        </Box>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleBackButton}
                        >
                            Trở về
                        </Button>
                    </Box>
                </Container>
                <Footer></Footer>
            </Box>
        </>
    );
}

export default ChangePasswordPage;
