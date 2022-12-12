import {
    Box,
    TextField,
    CssBaseline,
    Typography,
    Container,
} from "@mui/material";
import Footer from "../../components/Footer";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForgotPasswordMutation } from "../../features/User/userApiSlice";
import MessageAlert from "../../components/MessageAlert";
import { setEmailForgotPassword } from "../../features/User/userSlice";
import * as yup from "yup";
import useFormValidator from "../../hooks/useFormValidator";

function ForgotPasswordPage(props) {
    const forgotPasswordSchema = yup.object().shape({
        email: yup.string().email()
    });
    const { errors, texts, validate } = useFormValidator(forgotPasswordSchema);

    const [email, setEmail] = useState('');
    const handleEmailInput = (event) => {
        setEmail(event.target.value);
    }
    const [errMsg, setErrMsg] = useState('');

    const [forgotPassword, { isLoading, isSuccess, isError }] = useForgotPasswordMutation();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await validate({ email });
        if (data === null) return;
        try {
            await forgotPassword(email).unwrap();
            setEmailForgotPassword(email);
        } catch (err) {
            setErrMsg('');
            if(err.status){
                setErrMsg(err.data.errors?.join('</br>'));
            } else {
                setErrMsg("Không thể thực hiện.");
            }
        }
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess) {
            navigate("/verification-code");
        }
    }, [isSuccess, navigate]);

    return (
        <>
            {(isError || errMsg.length !== 0) && (
                <MessageAlert
                    message={errMsg? errMsg : "Đã có lỗi."}
                    hidden={false}
                    severity="error"
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
                            Quên mật khẩu
                        </Typography>
                        <Typography component="h2" variant="body1" align="left">
                            Hãy nhập địa chỉ email của bạn.
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
                                id="email"
                                label="Email"
                                name="email"
                                autoFocus
                                value={email}
                                onChange={handleEmailInput}
                                error={errors('email')}
                                helperText={texts('email')}
                            />
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                loading={isLoading}
                            >
                                Tiếp tục
                            </LoadingButton>
                        </Box>
                    </Box>
                </Container>
                <Footer></Footer>
            </Box>
        </>
    );
}

export default ForgotPasswordPage;
