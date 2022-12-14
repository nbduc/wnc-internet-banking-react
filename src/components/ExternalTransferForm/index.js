import {
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    FormHelperText
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LinearIndeterminate from "../LinearIndeterminate";
import AccountListDialog from "../AccountListDialog";
import MessageAlert from "../MessageAlert";
import { useState } from "react";
import { useExecuteExternalTransferMutation } from "../../features/Transfer/transferApiSlice";
import { useLazyGetAccountByAccountNumberQuery } from "../../features/Account/accountApiSlice";
import { selectAccountList } from "../../features/Account/accountSlice";
import { selectRecipientList } from "../../features/Recipient/recipientSlice";
import { useGetAllBanksQuery } from "../../features/Bank/bankApiSlice";
import * as Yup from "yup";
import useFormValidator from "../../hooks/useFormValidator";
import { CHARGE_CODE } from "../../common";
import { useSelector } from "react-redux";
import OtpDialog from "../OtpDialog";

function ExternalTransferForm(props) {
    const accountList = useSelector(selectAccountList);
    let recipientList = useSelector(selectRecipientList);
    const { data: bankList } = useGetAllBanksQuery();

    const [getAccountByAccountNumber, { isFetching: accountLoading }] = useLazyGetAccountByAccountNumberQuery();
    const [executeExternalTransfer, {isLoading, isError, isSuccess}] = useExecuteExternalTransferMutation();
    
    const [fromAccount, setFromAccount] = useState("");
    const [bankId, setBankId] = useState("");
    const [toAccountNumber, setToAccountNumber] = useState("");
    const [toAccountName, setToAccountName] = useState("");
    const [amount, setAmount] = useState("");
    const [content, setContent] = useState("");
    const [chargeCode, setChargeCode] = useState(0);
    const [toAccountErrMsg, setToAccountErrMsg] = useState('');
    const [msg, setMsg] = useState('');
    const [orderNumber, setOrderNumber] = useState("");
    const [otpDialogOpen, setOtpDialogOpen] = useState(false);
    const handleOtpDialogClose = (event, reason) => {
        if (reason && reason === "backdropClick") return;
        setOtpDialogOpen(false);
    };
    const handleFromAccountInput = (event) => {
        setFromAccount(event.target.value);
    };
    const handleBankInput = (event) => {
        setBankId(event.target.value);
    };
    const handleToAccountNumberInput = (event) => {
        setToAccountNumber(event.target.value);
    }
    const handleAmountInput = (event) => {
        const value = event.target.value;
        setAmount(value? Number.parseInt(value) : '');
    }
    const handleContentInput = (event) => {
        setContent(event.target.value);
    }
    const handleChargeCodeInput = (event) => {
        setChargeCode(event.target.value);
    }
    const handleToAccountNumberBlur = async (event) => {
        setToAccountName("");
        if (toAccountNumber) {
            try {
                const response = await getAccountByAccountNumber(toAccountNumber).unwrap();
                const accountName = response.data?.accountName;
                setToAccountName(accountName ? accountName : '');
                setToAccountErrMsg("");
            } catch (err) {
                if (!err.success) {
                    setToAccountErrMsg(err.data.errors?.join('</br>'));
                } else {
                    setToAccountErrMsg("Kh??ng th??? th???c hi???n.");
                }
            }
        }
    }
    const onSetToAccount = (toAccountNumber, toAccountName) => {
        setToAccountName(toAccountName);
        setToAccountNumber(toAccountNumber);
        setToAccountErrMsg('');
    }

    const createPaymentRequestSchema = Yup.object().shape({
        bankId: Yup.number().required("Ng??n h??ng l?? b???t bu???c."),
        fromAccount: Yup.string().required("S??? t??i kho???n ngu???n l?? b???t bu???c."),
        toAccountNumber: Yup.string().required("S??? t??i kho???n ????ch l?? b???t bu???c."),
        amount: Yup.number("S??? ti???n ph???i l?? s???.").min(0, "S??? ti???n kh??ng ???????c nh??? h??n 0"),
        chargeCode: Yup.number().required("H??nh th???c thanh to??n ph?? l?? b???t bu???c."),
    });
    const { errors, texts, validate } = useFormValidator(createPaymentRequestSchema);

    const resetForm = () => {
        setToAccountName('');
        setToAccountNumber('');
        setAmount('');
        setContent('');
    }

    const canSubmit = fromAccount && toAccountName && toAccountNumber && amount && chargeCode;
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await validate({ bankId, fromAccount, toAccountNumber, amount, chargeCode });
        if (data === null) return;
        try {
            const { fromAccountName, fromAccountNumber } = JSON.parse(fromAccount);
            const response = await executeExternalTransfer({
                bankId,
                fromAccountNumber,
                fromAccountName,
                toAccountName,
                toAccountNumber,
                amount,
                content,
                transferFeeType: chargeCode
            }).unwrap();
            response.message ? setMsg(response.message) : setMsg("");
            setOrderNumber(response.data);
            setOtpDialogOpen(true);
            resetForm();
        } catch (err) {
            setMsg('');
            if (err.message) {
                setMsg(err.message);
            } else if(!err.success && err.data){
                setMsg(err.data?.errors?.join('</br>'));
            } else {
                setMsg("Kh??ng th??? th???c hi???n.");
            }
        }
    }
    recipientList = recipientList.filter(r => r.bank.bankId === bankId);
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
            }}
        >
            {(isError || isSuccess) &&
                <MessageAlert
                    message={msg}
                    hidden={false}
                    severity={isError? "error" : "success"}
                ></MessageAlert>
            }
            <OtpDialog orderNumber={orderNumber} open={otpDialogOpen} onClose={handleOtpDialogClose}></OtpDialog>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1, minWidth: "50%" }}
            >
                <FormControl fullWidth required>
                    <InputLabel id="from-account-label">
                        T??i kho???n ngu???n
                    </InputLabel>
                    <Select
                        fullWidth
                        labelId="from-account-select-label"
                        id="from-account"
                        label="T??i kho???n ngu???n"
                        name="from-account"
                        value={fromAccount}
                        onChange={handleFromAccountInput}
                        error={errors("fromAccount")}
                        sx={{
                            textAlign: "left",
                        }}
                    >
                        {accountList?.map((a, idx) => {
                            return <MenuItem value={JSON.stringify({
                                fromAccountNumber: a.accountNumber,
                                fromAccountName: a.accountName
                            })} key={idx}>{a.accountName}</MenuItem>
                        })}
                    </Select>
                    <FormHelperText>{texts("fromAccount")}</FormHelperText>
                </FormControl>
                <Typography
                    sx={{ textAlign: "left", marginTop: 3, marginBottom: 3 }}
                >
                    Chuy???n ?????n
                </Typography>
                <FormControl fullWidth required>
                    <InputLabel id="bank-label">Ng??n h??ng</InputLabel>
                    <Select
                        fullWidth
                        labelId="bank-select-label"
                        id="bank"
                        label="Ng??n h??ng"
                        name="bank"
                        value={bankId}
                        onChange={handleBankInput}
                        error={errors("bankId")}
                        sx={{
                            textAlign: "left",
                        }}
                    >
                        {bankList?.map((b, idx) => 
                            <MenuItem key={idx} value={b.bankId}>{ b.bankName }</MenuItem>
                        )}
                    </Select>
                    <FormHelperText>{texts("bankId")}</FormHelperText>
                </FormControl>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="toAccount"
                    label="S??? t??i kho???n ????ch"
                    id="to-account"
                    autoComplete="to-account"
                    value={toAccountNumber}
                    onChange={handleToAccountNumberInput}
                    onBlur={handleToAccountNumberBlur}
                    error={toAccountErrMsg !== '' || errors("toAccountNumber")}
                    helperText={toAccountErrMsg? toAccountErrMsg : texts("toAccountNumber")}
                />
                {accountLoading && <LinearIndeterminate/>}
                <TextField
                    margin="normal"
                    disabled
                    fullWidth
                    name="recipientName"
                    label="T??n ng?????i nh???n"
                    id="recipient-name"
                    autoComplete="recipient-name"
                    value={toAccountName}
                />
                <AccountListDialog accountList={recipientList} onSetAccount={onSetToAccount}></AccountListDialog>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="amount"
                    label="S??? ti???n (??)"
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={handleAmountInput}
                    error={errors("amount")}
                    helperText={texts("amount")}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="content"
                    label="N???i dung"
                    id="content"
                    value={content}
                    onChange={handleContentInput}
                />
                <FormControl fullWidth required sx={{marginTop: 3}}>
                    <InputLabel id="charge-code-label">
                        H??nh th???c thanh to??n ph??
                    </InputLabel>
                    <Select
                        fullWidth
                        labelId="charge-code-select-label"
                        id="charge-code"
                        label="H??nh th???c thanh to??n ph??"
                        name="charge-code"
                        value={chargeCode}
                        onChange={handleChargeCodeInput}
                        error={errors("chargeCode")}
                        sx={{
                            textAlign: "left",
                        }}
                    >
                        {Object.keys(CHARGE_CODE).map((c, idx) => {
                            return <MenuItem value={c} key={idx}>{CHARGE_CODE[c]}</MenuItem>
                        })}
                    </Select>
                    <FormHelperText>{texts("chargCode")}</FormHelperText>
                </FormControl>
                <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    loading={isLoading}
                    disabled={!canSubmit}
                >
                    Chuy???n ti???n
                </LoadingButton>
            </Box>
        </Box>
    );
}

export default ExternalTransferForm;
