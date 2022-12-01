import {
    Button,
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
} from "@mui/material";
import AccountListDialog from "../AccountListDialog";
import { useState } from "react";

function ExternalTransferForm(props) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            fromAccount: data.get("from-account"),
        });
    };
    const [fromAccount, setFromAccount] = useState("");

    const fromAccountHandleChange = (event) => {
        setFromAccount(event.target.value);
    };

    const [bank, setBank] = useState("");
    const bankHandleChange = (event) => {
        setBank(event.target.value);
    };
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1, minWidth: "50%" }}
            >
                <FormControl fullWidth required>
                    <InputLabel id="from-account-label">
                        Tài khoản nguồn
                    </InputLabel>
                    <Select
                        fullWidth
                        labelId="from-account-select-label"
                        id="from-account"
                        label="Tài khoản nguồn"
                        name="from-account"
                        value={fromAccount}
                        onChange={fromAccountHandleChange}
                        sx={{
                            textAlign: "left",
                        }}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <Typography
                    sx={{ textAlign: "left", marginTop: 3, marginBottom: 3 }}
                >
                    Chuyển đến
                </Typography>
                <FormControl fullWidth required>
                    <InputLabel id="bank-label">Ngân hàng</InputLabel>
                    <Select
                        fullWidth
                        labelId="bank-select-label"
                        id="bank"
                        label="Ngân hàng"
                        name="bank"
                        value={bank}
                        onChange={bankHandleChange}
                        sx={{
                            textAlign: "left",
                        }}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="toAccount"
                    label="Số tài khoản đích"
                    id="to-account"
                    autoComplete="to-account"
                />
                <TextField
                    margin="normal"
                    disabled
                    fullWidth
                    name="recipientName"
                    label="Tên người nhận"
                    id="recipient-name"
                    autoComplete="recipient-name"
                />
                <AccountListDialog></AccountListDialog>
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
                    Chuyển tiền
                </Button>
            </Box>
        </Box>
    );
}

export default ExternalTransferForm;
