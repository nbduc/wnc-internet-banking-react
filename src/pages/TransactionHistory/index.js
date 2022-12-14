import { Box, TextField, Paper, Typography, Autocomplete } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from '@mui/material/CircularProgress';
import TransactionHistoryList from "../../components/TransactionHistoryList";
import MessageAlert from "../../components/MessageAlert";
import { useEffect, useState } from "react";
import { accountApiSlice } from "../../features/Account/accountApiSlice";
import * as Yup from 'yup';
import useFormValidator from "../../hooks/useFormValidator";


function TransactionHistoryPage() {
    const [
        getTransactionHistoryByAccountNumber,
        { isFetching }
    ] = accountApiSlice.endpoints.getTransactionHistoryByAccountNumber.useLazyQuery();
    const [
        getAccountsByEmail,
        { isFetching: isAccountsFetching }
    ] = accountApiSlice.endpoints.getAccountsByEmail.useLazyQuery();

    const [email, setEmail] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountList, setAccountList] = useState([]);
    const [accountNumberOpen, setAccountNumberOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const [transactionHistory, setTransactionHistory] = useState([]);

    const handleEmailInput = (event) => {
        setEmail(event.target.value);
    }
    const handleAccountNumberInput = (_event, value) => {
        setAccountNumber(value);
    }

    const emailSchema = Yup.object().shape({
        email: Yup.string().email('Email không đúng định dạng.'),
    });
    const { errors, texts, validate } = useFormValidator(emailSchema);

    const handleEmailInputBlur = async (event) => {
        if (event.target.value) {
            const data = await validate({ email });
            if (!data) return;
        }
    }

    useEffect(() => {
        if (!accountNumberOpen) {
            setAccountList([])
        } else if (email){
            const fetchData = async () => {
                try {
                    const result = await getAccountsByEmail(email).unwrap();
                    setAccountList(result);
                    setMsg('');
                } catch (err) {
                    setMsg('');
                    if(!err.success){
                        setMsg(err.errors?.join('</br>'));
                    } else {
                        setMsg("Không thể thực hiện.");
                    }
                }
            }
            fetchData();
        }
    }, [accountNumberOpen, email, setMsg, setAccountList, getAccountsByEmail]);

    const canSubmit = accountNumber? true : false;
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await getTransactionHistoryByAccountNumber(accountNumber).unwrap();
            setTransactionHistory(result.data);
        } catch (err) {
            setMsg('');
            if(!err.success){
                setMsg(err.data.errors?.join('</br>'));
            } else {
                setMsg("Không thể thực hiện.");
            }
        }
    };

    return (
        <>
            {msg && (
                <MessageAlert
                    message={msg}
                    hidden={false}
                    severity="error"
                ></MessageAlert>
            )}
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
                    sx={{ mt: 1, minWidth: "70%" }}
                >
                    <TextField
                        margin="normal"
                        fullWidth
                        name="email"
                        label="Email"
                        id="email"
                        autoComplete="email"
                        value={email}
                        onChange={handleEmailInput}
                        onBlur={handleEmailInputBlur}
                        error={errors('email')}
                        helperText={texts('email')? texts('email') : "Nhập Email để tìm kiếm số tài khoản."}
                    />
                    <Autocomplete
                        open={accountNumberOpen}
                        onOpen={() => setAccountNumberOpen(true)}
                        onClose={() => setAccountNumberOpen(false)}
                        loading={isAccountsFetching}
                        freeSolo
                        disablePortal
                        sx={{marginTop: '10px'}}
                        fullWidth
                        id="account-number"
                        options={accountList}
                        getOptionLabel={(option) => option?.accountNumber ?? option}
                        renderOption={(props, option) => (
                            <li {...props}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "flex-start" }}>
                                    <Typography variant="body1">{option.accountName}</Typography>
                                    <Typography variant="body2">{option.accountNumber}</Typography>
                                </Box>
                            </li>
                        )}
                        onInputChange={handleAccountNumberInput}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                error={errors('accountNumber')}
                                helperText={texts('accountNumber')}
                                required
                                label="Số tài khoản"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                        {isAccountsFetching ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />
                        }
                    />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!canSubmit}
                        loading={isFetching}
                    >
                        Xem lịch sử
                    </LoadingButton>
                    <TransactionHistoryList history={transactionHistory}></TransactionHistoryList>
                </Box>
            </Paper>
        </>
    );
}

export default TransactionHistoryPage;
