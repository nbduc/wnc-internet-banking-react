import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AccountListDialog from "../AccountListDialog";
import { useSelector } from "react-redux";
import { useCreatePaymentRequestMutation } from "../../features/PaymentRequest/paymentRequestApiSlice";
import MessageAlert from "../MessageAlert";
import LoadingButton from "@mui/lab/LoadingButton";
import { useLazyGetAccountByAccountNumberQuery } from "../../features/Account/accountApiSlice";
import * as Yup from "yup";
import useFormValidator from "../../hooks/useFormValidator";
import LinearIndeterminate from "../LinearIndeterminate";

function PaymentRequestFormDialog() {
    const { list: paymentRequestList, loading: paymentRequestLoading } = useSelector(state => state.paymentRequest);
    const debtorList = paymentRequestList?.map((p) => {
        return {
            accountName: p.toAccountName,
            accountNumber: p.toAccountNumber,
        }
    }).filter((account, index, self) =>
        index === self.findLastIndex((t) => (
            t.accountNumber === account.accountNumber
        ))
    );

    const [createPaymentRequest, { isLoading, isError, isSuccess }] = useCreatePaymentRequestMutation();
    
    const [ getAccountByAccountNumber, {isFetching: accountLoading} ] = useLazyGetAccountByAccountNumberQuery();

    const [toAccountNumber, setToAccountNumber] = React.useState('');
    const [toAccountName, setToAccountName] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [content, setContent] = React.useState('');
    const [toAccountErrMsg, setToAccountErrMsg] = React.useState('');
    const [msg, setMsg] = React.useState('');

    const handleToAccountNumberInput = (e) => {
        setToAccountNumber(e.target.value);
    }
    const handleAmountInput = (e) => {
        const value = e.target.value;
        setAmount(value? Number.parseInt(value) : '');
    }
    const handleContentInput = (e) => {
        setContent(e.target.value);
    }
    const onSetToAccount = (toAccountNumber, toAccountName) => {
        setToAccountName(toAccountName);
        setToAccountNumber(toAccountNumber);
        setToAccountErrMsg('');
    }

    const resetForm = () => {
        setToAccountName('');
        setToAccountNumber('');
        setAmount('');
        setContent('');
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason && reason === "backdropClick") return;
        setOpen(false);
        resetForm();
    };

    const handleToAccountNumberInputBlur = async (e) => {
        setToAccountName('');
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

    const createPaymentRequestSchema = Yup.object().shape({
        toAccountName: Yup.string().required("Số tài khoản là bắt buộc."),
        amount: Yup.number("Số tiền phải là số.").min(0, "Số tiền không được nhỏ hơn 0"),
    });
    const { errors, texts, validate } = useFormValidator(createPaymentRequestSchema);

    const canSubmit = toAccountName && toAccountNumber && amount;
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await validate({ toAccountName, amount });
        if (data === null) return;
        try {
            await createPaymentRequest({
                toAccountName,
                toAccountNumber,
                amount,
                content
            }).unwrap();
            setMsg("Gửi nhắc nợ thành công.")
            setOpen(false);
            resetForm();
        } catch (err) {
            setMsg('');
            if(!err.success && err.data){
                setMsg(err.data.errors?.join('</br>'));
            } else {
                setMsg("Không thể thực hiện.");
            }
        }
    }

    return (
        <div>
            {(isError || isSuccess) &&
                <MessageAlert
                    message={msg}
                    hidden={false}
                    severity={isError? "error" : "success"}
                ></MessageAlert>
            }
            <Button variant="outlined" onClick={handleClickOpen}>
                Tạo nhắc nợ mới
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Tạo nhắc nợ mới</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Điền thông tin người nợ, nhập số tiền chuyển và nội dung
                        nhắc nợ, ra lệnh <b>GỬI NHẮC NỢ</b>. Nhắc nợ sẽ được gửi
                        đến cho người nợ. Người nợ xem được nhắc nợ này ở màn
                        hình <b>Xem danh sách nợ chưa thanh toán</b>.
                    </DialogContentText>
                    <br/>
                    {accountLoading && <LinearIndeterminate/>}
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="account-number"
                            label="Số tài khoản người nợ"
                            id="account-number"
                            autoComplete="account-number"
                            value={toAccountNumber}
                            onChange={handleToAccountNumberInput}
                            onBlur={handleToAccountNumberInputBlur}
                            error={toAccountErrMsg !== '' || errors('toAccountNumber')}
                            helperText={toAccountErrMsg? toAccountErrMsg : texts('toAccountNumber')}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="name"
                            label="Tên người nợ"
                            id="name"
                            disabled={true}
                            value={toAccountName}
                        />
                         <AccountListDialog
                            onSetAccount={onSetToAccount}
                            accountList={debtorList}
                            loading={paymentRequestLoading}
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
                            error={errors('amount')}
                            helperText={texts('amount')}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            multiline
                            minRows={3}
                            name="memo-information"
                            label="Nội dung nhắc nợ"
                            id="memo-information"
                            autoComplete="memo-information"
                            value={content}
                            onChange={handleContentInput}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <LoadingButton
                        onClick={handleSubmit}
                        loading={isLoading}
                        disabled={!canSubmit}
                    >Gửi nhắc nợ</LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PaymentRequestFormDialog;
