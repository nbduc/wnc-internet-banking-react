import { Button, Box, TextField, Paper } from "@mui/material";
import TransactionHistoryList from "../../components/TransactionHistoryList";

function TransactionHistoryPage() {
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="account-number"
                    label="Số tài khoản"
                    id="account-number"
                    autoComplete="account-number"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Xem lịch sử
                </Button>
            </Box>
            <TransactionHistoryList></TransactionHistoryList>
        </Paper>
    );
}

export default TransactionHistoryPage;
