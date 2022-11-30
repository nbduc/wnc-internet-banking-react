import {
    Box,
    TextField,
    CssBaseline,
    Typography,
    Container,
    Link,
    Snackbar,
    Alert,
    AlertTitle,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link as RouterLink } from "react-router-dom";
import Footer from "../../components/Footer";
import { userLoginFetch } from "../../features/Auth/authSlice";
import store from "../../app/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function MessageAlert({ message, hidden }) {
    const [open, setOpen] = useState(!hidden);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
            >
                <AlertTitle>Lỗi</AlertTitle>
                {message}
            </Alert>
        </Snackbar>
    );
}

function LoginPage(props) {
    const { isLoggedIn, isLoggingIn, loginMessage } = useSelector(
        (state) => state.auth
    );
    const navigate = useNavigate();

    //already logged in
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [navigate, isLoggedIn]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const loginData = {
            username: data.get("username"),
            password: data.get("password"),
        };
        store.dispatch(userLoginFetch(loginData));
    };
    return (
        <>
            {!isLoggedIn && loginMessage.length !== 0 && (
                <MessageAlert
                    message={loginMessage}
                    hidden={isLoggedIn}
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
                        <Typography component="h2" variant="h5">
                            Chào mừng bạn đến với
                        </Typography>
                        <Typography component="h1" variant="h4">
                            Internet Banking
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Tên đăng nhập"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Mật khẩu"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                loading={isLoggingIn}
                            >
                                Đăng nhập
                            </LoadingButton>
                            <Link
                                variant="body2"
                                component={RouterLink}
                                to={"/forgot-password"}
                            >
                                Quên mật khẩu?
                            </Link>
                        </Box>
                    </Box>
                </Container>
                <Footer></Footer>
            </Box>
        </>
    );
}

export default LoginPage;
