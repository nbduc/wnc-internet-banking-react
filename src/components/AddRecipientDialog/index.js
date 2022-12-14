import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { FormHelperText } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAddRecipientMutation } from "../../features/Recipient/recipientApiSlice";
import * as Yup from "yup";
import useFormValidator from "../../hooks/useFormValidator";
import MessageAlert from "../MessageAlert";
import { useGetAllBanksQuery } from "../../features/Bank/bankApiSlice";
import { useLazyGetAccountByAccountNumberQuery } from "../../features/Account/accountApiSlice";
import { useSelector } from "react-redux";
import { selectCustomerId } from "../../features/Auth/authSlice";
import LinearIndeterminate from "../LinearIndeterminate";

function AddRecipientDialog(props) {
    const { data: bankList } = useGetAllBanksQuery();
    const customerId = useSelector(selectCustomerId);
    const [accountNumber, setAccountNumber] = React.useState("");
    const [accountName, setAccountName] = React.useState("");
    const [accountNameErrMsg, setAccountNameErrMsg] = React.useState("");
    const [nickName, setNickName] = React.useState("");
    const [bankId, setBankId] = React.useState("");
    const [msg, setMsg] = React.useState("");
    const handleAccountNumberInput = (event) => {
        setAccountNumber(event.target.value);
    };
    const handleNickNameInput = (event) => {
        setNickName(event.target.value);
    };
    const handleBankInput = (event) => {
        setBankId(event.target.value);
    }

    const [getAccountByAccountNumber, {isFetching: accountLoading}] = useLazyGetAccountByAccountNumberQuery();
    const getAndSetAccountName = async () => {
        setAccountName("");
        if (accountNumber && bankId) {
            try {
                const response = await getAccountByAccountNumber(accountNumber).unwrap();
                const accountNameResponse = response.data?.accountName;
                setAccountName(accountNameResponse ? accountNameResponse : '');
                setAccountNameErrMsg("");
            } catch (err) {
                if (!err.success) {
                    setAccountNameErrMsg(err.data.errors?.join('</br>'));
                } else {
                    setAccountNameErrMsg("Kh??ng th??? th???c hi???n.");
                }
            }
        }
    }
    const handleAccountNumberBlur = (event) => {
        getAndSetAccountName();
    }
    const handleBankBlur = (event) => {
        getAndSetAccountName();
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    const createRecipientSchema = Yup.object().shape({
        accountNumber: Yup.string().required("S??? t??i kho???n l?? b???t bu???c."),
        nickName: Yup.string(),
    });
    const { errors, texts, validate } = useFormValidator(createRecipientSchema);

    const resetForm = () => {
        setAccountNumber("");
        setNickName("");
        setBankId("");
    }

    const [ addRecipient, { isLoading, isError, isSuccess }] = useAddRecipientMutation();
    const canSubmit = accountNumber && accountName && bankId && customerId;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await validate({
            accountNumber,
            nickName,
        });
        if (data === null) return;
        try {
            await addRecipient({
                accountNumber,
                accountName,
                nickName,
                bankId,
                customerId,
            }).unwrap();
            setOpen(false);
            setMsg("Th??m ng?????i nh???n th??nh c??ng");
        } catch (err) {
            setMsg('');
            if(!err.success){
                setMsg(err.data.errors?.join('</br>'));
            } else {
                setMsg("Kh??ng th??? th???c hi???n.");
            }
        }
    }

    React.useEffect(() => {
        resetForm();
    }, [open]);

    return (
        <>
            {(isError || isSuccess) && (
                <MessageAlert
                    message={msg}
                    hidden={false}
                    severity={isError? "error" : "success"}
                ></MessageAlert>
            )}
            <Button variant="outlined" onClick={handleClickOpen} {...props}>
                Th??m ng?????i nh???n m???i
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Th??ng tin ng?????i nh???n</DialogTitle>
                <DialogContent>
                    {accountLoading && <LinearIndeterminate/>}
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="accountNumber"
                            label="S??? t??i kho???n"
                            id="accountNumber"
                            autoComplete="accountNumber"
                            value={accountNumber}
                            onChange={handleAccountNumberInput}
                            error={errors("accountNumber")}
                            helperText={texts("accountNumber")}
                            onBlur={handleAccountNumberBlur}
                        />
                        <FormControl fullWidth required sx={{marginTop: 2, marginBottom: 1}}>
                            <InputLabel id="role-label">Ng??n h??ng</InputLabel>
                            <Select
                                fullWidth
                                labelId="bank-label"
                                id="bank"
                                label="Ng??n h??ng"
                                name="bank"
                                value={bankId}
                                onChange={handleBankInput}
                                sx={{
                                    textAlign: "left",
                                }}
                                error={errors("bankId")}
                                onBlur={handleBankBlur}
                            >
                                {bankList && bankList.map((bank, idx) => 
                                    <MenuItem key={idx} value={bank.bankId}>{ bank.bankName }</MenuItem>
                                )}
                            </Select>
                            <FormHelperText>{texts("bankId")}</FormHelperText>
                        </FormControl>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="accountName"
                            label="T??n t??i kho???n"
                            id="accountName"
                            autoComplete="accountName"
                            value={accountName}
                            disabled
                            error={accountNameErrMsg !== ''}
                            helperText={accountNameErrMsg}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="nickName"
                            label="T??n g???i nh???"
                            id="nickName"
                            value={nickName}
                            onChange={handleNickNameInput}
                            error={errors("nickName")}
                            helperText={texts("nickName")}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Tr??? v???</Button>
                    <LoadingButton
                        loading={isLoading}
                        disabled={!canSubmit}
                        onClick={handleSubmit}>Th??m</LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddRecipientDialog;
