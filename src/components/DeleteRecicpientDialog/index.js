import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useDeleteRecipientMutation } from "../../features/Recipient/recipientApiSlice";
import MessageAlert from "../MessageAlert";
import LoadingButton from "@mui/lab/LoadingButton";

function DeleteRecipientDetailsDialog({recipient, ...props}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    const [deleteRecipient, { isLoading, isError, isSuccess }] = useDeleteRecipientMutation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await deleteRecipient(recipient.id);
    }

    React.useEffect(() => {
        handleClose()
    }, [isSuccess, isError]);

    return (
        <>
            {(isError || isSuccess) &&
                <MessageAlert
                    message={isError? "Xóa người nhận thất bại." : "Xóa người nhận thành công."}
                    hidden={false}
                    severity={isError? "error" : "success"}
                ></MessageAlert>
            }
            <Tooltip title="Xóa">
                <IconButton aria-label="edit" color="secondary" onClick={handleClickOpen} {...props}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Bạn muốn xóa người nhận này?</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Tên: {recipient.nickName}
                    </Typography>
                    <Typography variant="body1">
                        STK: {recipient.accountNumber}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <LoadingButton loading={isLoading} onClick={handleSubmit}>OK</LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeleteRecipientDetailsDialog;