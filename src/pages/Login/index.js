import {
    Box,
    TextField,
    CssBaseline,
    Typography,
    Container,
    Link,
    FormControlLabel,
    Checkbox
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link as RouterLink } from "react-router-dom";
import Footer from "../../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useLoginMutation } from "../../features/Auth/authApiSlice";
import MessageAlert from "../../components/MessageAlert";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectRole } from "../../features/Auth/authSlice";
import { employeeListItems, adminListItems, customerListItems, ROLES } from "../../common";
import { appName } from "../../common";

function LoginPage(props) {
    const [login, { isLoading: isLoggingIn }] = useLoginMutation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [persist, setPersist] = usePersist();
    const userRole = useSelector(selectRole);

    const navigate = useNavigate();
    const location = useLocation();
    
    const captchaRef = useRef(null);

    const canSubmit = email && password && checked;

    //already logged in
    useEffect(() => {
        const getFirstPlace = (() => {
            switch (userRole) {
                case ROLES.admin: return adminListItems[0].link;
                case ROLES.employee: return employeeListItems[0].link;
                case ROLES.customer: return customerListItems[0].link;
                default: return '#/';
            }
        })()
        const from = location.state?.from?.pathname || getFirstPlace;
        if (isLoggedIn) {
            navigate(from, {replace: true});
        }
    }, [navigate, location, isLoggedIn, userRole]);

    const handleEmailInput = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordInput = (event) => {
        setPassword(event.target.value);
    }

    const handleReCaptcha = () => {
        setChecked(true);
    }

    const handleToggle = () => setPersist(prev => !prev);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const reCaptchaToken = captchaRef.current?.getValue();
        setErrMsg('');

        //data and error
        try {
            await login({ email, password, reCaptchaToken }).unwrap();
            setIsLoggedIn(true);
        } catch (err) {
            setEmail('');
            setPassword('');
            setChecked(false);
            captchaRef.current.reset();
            if (!err?.status) {
                setErrMsg('Máy chủ không phản hồi');
            } else {
                setErrMsg('Đăng nhập không thành công');
            }
        }
    };
    return (
        <>
            {!isLoggedIn && errMsg.length !== 0 && (
                <MessageAlert
                    message={errMsg}
                    hidden={isLoggedIn}
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
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h2" variant="h5">
                            Chào mừng bạn đến với
                        </Typography>
                        <Typography component="h1" variant="h4">
                            {appName}
                        </Typography>
                        <Typography component="h2" variant="h6">
                            Internet Banking
                        </Typography>
                        <img src="/logo.png" alt="logo" style={{ width: "200px", height: "200px"} } />
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1}}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={handleEmailInput}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Mật khẩu"
                                type="password"
                                id="password"
                                autoComplete="password"
                                value={password}
                                onChange={handlePasswordInput}
                            />
                            <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} onChange={handleReCaptcha} ref={captchaRef} />
                            <FormControlLabel control={<Checkbox checked={persist} onChange={handleToggle} />} label="Trust this device" />
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                loading={isLoggingIn}
                                disabled={!canSubmit}
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
