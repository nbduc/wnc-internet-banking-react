import { Button, Box, TextField, Typography, Paper } from "@mui/material";

function CreateAccountPage() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            username: data.get("username"),
        });
    };
    return (
        <Paper
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: 3,
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1, minWidth: "50%" }}
            >
                <Typography sx={{ textAlign: "left", marginTop: 3 }}>
                    Thông tin đăng nhập
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="username"
                    label="Username"
                    id="username"
                    autoComplete="username"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mật khẩu"
                    id="password"
                    autoComplete="password"
                />
                <Typography sx={{ textAlign: "left", marginTop: 3 }}>
                    Thông tin cá nhân
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="Họ và tên"
                    id="name"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    id="email"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="phone"
                    label="Số điện thoại"
                    id="phone"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Tạo tài khoản
                </Button>
            </Box>
        </Paper>
    );
}

export default CreateAccountPage;
