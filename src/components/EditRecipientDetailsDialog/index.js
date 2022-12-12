import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import MessageAlert from "../MessageAlert";
import { useGetAllBanksQuery } from "../../features/Bank/bankApiSlice";
import { useUpdateRecipientMutation } from "../../features/Recipient/recipientApiSlice";
import LoadingButton from "@mui/lab/LoadingButton";

function EditRecipientDetailsDialog({recipient, ...props}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    const id = recipient.id;
    const [nickName, setNickName] = React.useState(recipient?.nickName);
    const [accountNumber, setAccountNumber] = React.useState(recipient?.accountNumber);
    const [bankId, setBankId] = React.useState(recipient?.bankId);
    const { data: bankList } = useGetAllBanksQuery();
    const [updateRecipient, {isLoading, isError, isSuccess}] = useUpdateRecipientMutation();

    const handleNickNameInput = (event) => {
        setNickName(event.target.value);
    }
    const handleAccountNumberInput = (event) => {
        setAccountNumber(event.target.value);
    }
    const handleBankSelect = event => {
        setBankId(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateRecipient({
            id,
            bankId,
            accountNumber,
            nickName,
        });
    }

    React.useEffect(() => {
        handleClose()
    }, [isSuccess]);

    return (
        <>
            {(isError || isSuccess) &&
                <MessageAlert
                    message={isError? "Cập nhật thất bại." : "Cập nhật thành công."}
                    hidden={false}
                    severity={isError? "error" : "success"}
                ></MessageAlert>
            }
            <Tooltip title="Chỉnh sửa">
                <IconButton aria-label="edit" color="primary" onClick={handleClickOpen} {...props}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Thông tin người nhận</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1}}
                    >
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Tên người nhận"
                            name="nickName"
                            autoFocus
                            value={nickName}
                            onChange={handleNickNameInput}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Số tài khoản"
                            name="accountNumber"
                            value={accountNumber}
                            onChange={handleAccountNumberInput}
                        />
                        <FormControl fullWidth required sx={{marginTop: 2}}>
                            <InputLabel id="bank-label">
                                Ngân hàng
                            </InputLabel>
                            <Select
                                fullWidth
                                labelId="bank-select-label"
                                label="Ngân hàng"
                                name="bank-id"
                                value={bankId}
                                onChange={handleBankSelect}
                                sx={{
                                    textAlign: "left",
                                }}
                            >
                                {bankList?.map(bank => {
                                    return <MenuItem value={bank.bankId} key={bank.bankId}>{ bank.bankName }</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <LoadingButton loading={isLoading} onClick={handleSubmit}>OK</LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditRecipientDetailsDialog;