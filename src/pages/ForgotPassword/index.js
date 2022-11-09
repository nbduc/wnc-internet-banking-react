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

function ForgotPasswordPage(props) {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
        });
        navigate("/verification-code");
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
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Tiếp tục
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Footer></Footer>
        </Box>
    );
}

export default ForgotPasswordPage;
