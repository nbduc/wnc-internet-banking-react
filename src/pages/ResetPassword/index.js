import {
    Box,
    TextField,
    CssBaseline,
    Typography,
    Container,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectForgotPasswordInfor } from "../../features/User/userSlice";
import { useState } from "react";
import * as Yup from "yup";
import useFormValidator from "../../hooks/useFormValidator";
import { useResetPasswordMutation } from "../../features/User/userApiSlice";
import MessageAlert from "../../components/MessageAlert";

function ResetPasswordPage(props) {
    const { email, otpCode } = useSelector(selectForgotPasswordInfor);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [msg, setMsg] = useState("");

    const handlePasswordInput = (event) => {
        setPassword(event.target.value);
    }
    const handleConfirmPasswordInput = (event) => {
        setConfirmPassword(event.target.value);
    }

    const resetPasswordSchema = Yup.object().shape({
        password: Yup.string().required("Mật khẩu là bắt buộc."),
        confirmPassword: Yup.string().required("Nhập lại mật khẩu là bắt buộc."),
    });
    const { errors, texts, validate } = useFormValidator(resetPasswordSchema);

    const [resetPassword, {isLoading, isSuccess, isError}] = useResetPasswordMutation();
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await validate({
            password,
            confirmPassword,
        });
        if (data === null) return;
        try {
            await resetPassword({
                email,
                newPassword: password,
                confirmPassword,
                otp: otpCode,
            }).unwrap();
            navigate("/login");
        } catch (err) {
            setMsg("Đổi mật khẩu không thành công.")
        }
    };
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100vh",
            }}
        >
            {(isError || isSuccess) &&
                <MessageAlert
                    message={msg}
                    hidden={false}
                    severity={isError? "error" : "success"}
                ></MessageAlert>
            }
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
                        Khôi phục mật khẩu
                    </Typography>
                    <Typography component="h2" variant="body1" align="left">
                        Hãy đặt lại một mật khẩu mới.
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
                            name="new-password"
                            label="Mật khẩu"
                            type="password"
                            id="new-password"
                            autoComplete="current-password"
                            autoFocus
                            error={errors("password")}
                            helperText={texts("password")}
                            onChange={handlePasswordInput}
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
                            error={errors("confirmPassword")}
                            helperText={texts("confirmPassword")}
                            onChange={handleConfirmPasswordInput}
                        />
                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            loading={isLoading}
                        >
                            Khôi phục
                        </LoadingButton>
                    </Box>
                </Box>
            </Container>
            <Footer></Footer>
        </Box>
    );
}

export default ResetPasswordPage;
