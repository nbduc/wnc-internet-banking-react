import {
    Button,
    Box,
    TextField,
    CssBaseline,
    Typography,
    Container,
    Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Footer from "../../components/Footer";

function LoginPage(props) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            username: data.get("username"),
            password: data.get("password"),
        });
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Đăng nhập
                        </Button>
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
    );
}

export default LoginPage;
