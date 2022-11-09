import {
    Button,
    Box,
    TextField,
    CssBaseline,
    Typography,
    Container,
} from "@mui/material";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

function VerificationCodePage(props) {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            code: data.get("otp-code"),
        });
        navigate("/reset-password");
    };
    const resendCodeHandle = (event) => {
        event.preventDefault();
        console.log("resending");
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
                        Hãy nhập mã xác thực vừa được gửi vào email của bạn.
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
                            id="otp-code"
                            label="Mã xác thực"
                            name="otp-code"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Xác nhận
                        </Button>
                    </Box>
                    <Box
                        component="form"
                        onSubmit={resendCodeHandle}
                        noValidate
                        sx={{ mt: 5, width: "100%" }}
                    >
                        <Typography variant="body">
                            Không nhận được mã xác thực?
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Gửi lại mã
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Footer></Footer>
        </Box>
    );
}

export default VerificationCodePage;
