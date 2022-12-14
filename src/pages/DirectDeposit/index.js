import { Box, TextField, Typography, Paper, Autocomplete } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from '@mui/material/CircularProgress';
import MessageAlert from "../../components/MessageAlert";
import { useEffect, useState } from "react";
import { accountApiSlice, useDirectDepositMutation } from "../../features/Account/accountApiSlice";
import * as Yup from 'yup';
import useFormValidator from "../../hooks/useFormValidator";

function DirectDepositPage() {
    const [directDeposit, {isLoading, isSuccess}] = useDirectDepositMutation();
    const [getAccountsByEmail, {isFetching: isAccountsFetching}] = accountApiSlice.endpoints.getAccountsByEmail.useLazyQuery();
    
    const [email, setEmail] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [msg, setMsg] = useState('');
    const [accountList, setAccountList] = useState([]);
    const [accountNumberOpen, setAccountNumberOpen] = useState(false);

    const handleEmailInput = (event) => {
        setEmail(event.target.value);
    }
    const handleAccountNumberInput = (_event, value) => {
        setAccountNumber(value);
    }
    const handleAmountInput = (event) => {
        if (event.target.value) {
            setAmount(Number.parseInt(event.target.value))
        }
    }

    const directDepositSchema = Yup.object().shape({
        accountNumber: Yup.string()
            .min(8, 'Số tài khoản phải chứa ít nhất 8 ký tự.')
            .max(15, 'Số tài khoản không được quá 15 ký tự.')
            .required('Số tài khoản là bắt buộc.'),
        amount: Yup.number()
            .min(0, "Số tiền không được âm.")
            .required('Số tiền là bắt buộc.'),
    });
    const emailSchema = Yup.object().shape({
        email: Yup.string().email('Email không đúng định dạng.'),
    });

    const { errors, texts, validate } = useFormValidator(directDepositSchema);
    const { errors: emailErrors, texts: emailTexts, validate: emailValidate } = useFormValidator(emailSchema);

    const handleEmailInputBlur = async (event) => {
        if (event.target.value) {
            const data = await emailValidate({ email });
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

    const canSubmit = accountNumber && amount;
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await validate({ accountNumber, amount });
        if (!data) return;
        try {
            await directDeposit({
                accountNumber,
                amount
            }).unwrap();
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
                    severity="warning"
                ></MessageAlert>
            )}
            {isSuccess && (
                <MessageAlert
                    message={"Nạp tiền thành công."}
                    hidden={false}
                    severity="success"
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
                    sx={{ mt: 1, minWidth: "50%" }}
                >
                    <Typography sx={{ textAlign: "left", marginTop: 3 }}>
                        Thông tin tài khoản
                    </Typography>
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
                        error={emailErrors('email')}
                        helperText={emailTexts('email')? emailTexts('email') : "Nhập Email để tìm kiếm số tài khoản."}
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="amount"
                        label="Số tiền (đ)"
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={handleAmountInput}
                        error={errors('amount')}
                        helperText={texts('amount')}
                    />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!canSubmit}
                        loading={isLoading}
                    >
                        Nạp tiền
                    </LoadingButton>
                </Box>
            </Paper>
        </>
    );
}

export default DirectDepositPage;
