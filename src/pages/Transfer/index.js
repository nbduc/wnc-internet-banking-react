import {
    Button,
    Box,
    TextField,
    Paper,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import { useState } from "react";
import ControlledAccordion from "../../components/ControlledAccordion";

function InternalTransferForm(props) {
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
                sx={{ mt: 1 }}
            >
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        Tài khoản nguồn
                    </InputLabel>
                    <Select
                        required
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="toAccount"
                    label="Tài khoản đích"
                    id="to-account"
                    autoComplete="to-account"
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
                    Chuyển tiền
                </Button>
            </Box>
        </Box>
    );
}

function TransferPage() {
    return (
        <>
            <ControlledAccordion title={"Chuyển tiền cùng ngân hàng"}>
                <InternalTransferForm></InternalTransferForm>
            </ControlledAccordion>
            <ControlledAccordion title={"Chuyển tiền liên ngân hàng"}>
                <InternalTransferForm></InternalTransferForm>
            </ControlledAccordion>
        </>
    );
}

export default TransferPage;
