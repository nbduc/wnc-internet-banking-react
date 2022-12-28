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
import { accountApiSlice } from "../../features/Account/accountApiSlice";
import { useSelector } from "react-redux";
import { selectCustomerId } from "../../features/Auth/authSlice";

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

    const [getAccountByAccountNumber] = accountApiSlice.endpoints.getAccountByAccountNumber.useLazyQuery();
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
                    setAccountNameErrMsg("Không thể thực hiện.");
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
        accountNumber: Yup.string().required("Số tài khoản là bắt buộc."),
        nickName: Yup.string(),
    });
    const { errors, texts, validate } = useFormValidator(createRecipientSchema);

    const resetForm = () => {
        setAccountNumber("");
        setNickName("");
        setBankId("");
    }

    const [ addRecipient, { isLoading, isError, isSuccess }] = useAddRecipientMutation();
    const canSubmit = accountNumber && accountName && nickName && bankId && customerId;
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
            setMsg("Thêm người nhận thành công");
        } catch (err) {
            setMsg('');
            if(!err.success){
                setMsg(err.data.errors?.join('</br>'));
            } else {
                setMsg("Không thể thực hiện.");
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
                Thêm người nhận mới
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Thông tin người nhận</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="accountNumber"
                            label="Số tài khoản"
                            id="accountNumber"
                            autoComplete="accountNumber"
                            value={accountNumber}
                            onChange={handleAccountNumberInput}
                            error={errors("accountNumber")}
                            helperText={texts("accountNumber")}
                            onBlur={handleAccountNumberBlur}
                        />
                        <FormControl fullWidth required sx={{marginTop: 2, marginBottom: 1}}>
                            <InputLabel id="role-label">Ngân hàng</InputLabel>
                            <Select
                                fullWidth
                                labelId="bank-label"
                                id="bank"
                                label="Ngân hàng"
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
                            label="Tên tài khoản"
                            id="accountName"
                            autoComplete="accountName"
                            value={accountName}
                            disabled
                            error={accountNameErrMsg !== ''}
                            helperText={accountNameErrMsg}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="nickName"
                            label="Tên gợi nhớ"
                            id="nickName"
                            value={nickName}
                            onChange={handleNickNameInput}
                            error={errors("nickName")}
                            helperText={texts("nickName")}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Trở về</Button>
                    <LoadingButton
                        loading={isLoading}
                        disabled={!canSubmit}
                        onClick={handleSubmit}>Thêm</LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddRecipientDialog;
