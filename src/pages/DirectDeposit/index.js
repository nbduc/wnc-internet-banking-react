import { Button, Box, TextField, Typography, Paper } from "@mui/material";

function DirectDepositPage() {
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
                    Thông tin tài khoản
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
                <Typography>hoặc</Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="account-number"
                    label="Số tài khoản"
                    id="account-number"
                    autoComplete="account-number"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="amount"
                    label="Số tiền (đ)"
                    id="amount"
                    type="number"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Nạp tiền
                </Button>
            </Box>
        </Paper>
    );
}

export default DirectDepositPage;
