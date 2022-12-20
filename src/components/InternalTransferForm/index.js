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
import AccountListDialog from "../AccountListDialog";
import MessageAlert from "../MessageAlert";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAccountList } from "../../features/Account/accountSlice";
import { CHARGE_CODE } from "../../common";
import { accountApiSlice } from "../../features/Account/accountApiSlice";
import { selectRecipientList } from "../../features/Recipient/recipientSlice";
import * as Yup from "yup";
import useFormValidator from "../../hooks/useFormValidator";
import { useExecuteInternalTransferMutation } from "../../features/Transfer/transferApiSlice";

function InternalTransferForm(props) {
    const accountList = useSelector(selectAccountList);
    const recipientList = useSelector(selectRecipientList);

    const [getAccountByAccountNumber] = accountApiSlice.endpoints.getAccountByAccountNumber.useLazyQuery();
    const [executeInternalTransfer, {isLoading, isError, isSuccess}] = useExecuteInternalTransferMutation();

    const [fromAccount, setFromAccount] = useState("");
    const [toAccountNumber, setToAccountNumber] = useState("");
    const [toAccountName, setToAccountName] = useState("");
    const [amount, setAmount] = useState("");
    const [content, setContent] = useState("");
    const [chargeCode, setChargeCode] = useState("EXCLUDE");
    const [toAccountErrMsg, setToAccountErrMsg] = useState('');
    const [msg, setMsg] = useState('');
    const handleFromAccountInput = (event) => {
        setFromAccount(event.target.value);
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
                    setToAccountErrMsg("Không thể thực hiện.");
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
        fromAccount: Yup.string().required("Số tài khoản nguồn là bắt buộc."),
        toAccountNumber: Yup.string().required("Số tài khoản đích là bắt buộc."),
        amount: Yup.number("Số tiền phải là số.").min(0, "Số tiền không được nhỏ hơn 0"),
        chargeCode: Yup.string().required("Hình thức thanh toán phí là bắt buộc."),
    });
    const { errors, texts, validate } = useFormValidator(createPaymentRequestSchema);

    const resetForm = () => {
        setToAccountName('');
        setToAccountNumber('');
        setAmount('');
        setContent('');
    }

    const canSubmit = toAccountName && toAccountNumber && amount;
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await validate({ fromAccount, toAccountNumber, amount, chargeCode });
        if (data === null) return;
        try {
            const { fromAccountName, fromAccountNumber } = JSON.parse(fromAccount);
            await executeInternalTransfer({
                fromAccountNumber,
                fromAccountName,
                toAccountName,
                toAccountNumber,
                amount,
                content,
                chargeCode
            }).unwrap();
            setMsg("Chuyển tiền thành công.")
            resetForm();
        } catch (err) {
            setMsg('');
            console.log(err);
            if(!err.success && err.data){
                setMsg(err.data?.errors?.join('</br>'));
            } else {
                setMsg("Không thể thực hiện.");
            }
        }
    }
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
                        onChange={handleFromAccountInput}
                        sx={{
                            textAlign: "left",
                        }}
                        error={errors("fromAccount")}
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
                <Typography sx={{ textAlign: "left", marginTop: 3 }}>
                    Chuyển đến
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="toAccount"
                    label="Số tài khoản đích"
                    id="to-account"
                    autoComplete="to-account"
                    value={toAccountNumber}
                    onChange={handleToAccountNumberInput}
                    onBlur={ handleToAccountNumberBlur }
                    error={toAccountErrMsg !== '' || errors('toAccountNumber')}
                    helperText={toAccountErrMsg? toAccountErrMsg : texts('toAccountNumber')}
                />
                <TextField
                    margin="normal"
                    disabled
                    fullWidth
                    name="recipientName"
                    label="Tên người nhận"
                    id="recipient-name"
                    autoComplete="recipient-name"
                    value={toAccountName}
                />
                <AccountListDialog
                    onSetAccount={onSetToAccount}
                    accountList={recipientList}
                ></AccountListDialog>
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
                    error={errors("amount")}
                    helperText={texts("amount")}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="content"
                    label="Nội dung"
                    id="content"
                    value={content}
                    onChange={handleContentInput}
                />
                <FormControl fullWidth required sx={{marginTop: 3}}>
                    <InputLabel id="charge-code-label">
                        Hình thức thanh toán phí
                    </InputLabel>
                    <Select
                        fullWidth
                        labelId="charge-code-select-label"
                        id="charge-code"
                        label="Hình thức thanh toán phí"
                        name="charge-code"
                        value={chargeCode}
                        onChange={handleChargeCodeInput}
                        sx={{
                            textAlign: "left",
                        }}
                    >
                        {Object.keys(CHARGE_CODE).map((c, idx) => {
                            return <MenuItem value={c} key={idx}>{CHARGE_CODE[c]}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    loading={isLoading}
                    disabled={!canSubmit}
                >
                    Chuyển tiền
                </LoadingButton>
            </Box>
        </Box>
    );
}

export default InternalTransferForm;
