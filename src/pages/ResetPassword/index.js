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

function ResetPasswordPage(props) {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("/");
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
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Khôi phục
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Footer></Footer>
        </Box>
    );
}

export default ResetPasswordPage;
