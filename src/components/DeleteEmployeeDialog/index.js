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
import { useDeleteEmployeeMutation } from "../../features/Employee/employeeApiSlice";
import MessageAlert from "../MessageAlert";
import LoadingButton from "@mui/lab/LoadingButton";

function DeleteEmployeeDialog({employee, ...props}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    const [deleteEmployee, { isLoading, isError, isSuccess }] = useDeleteEmployeeMutation();

    const [msg, setMsg] = React.useState("");
    const handleDeleteEmployee = async (e) => {
        try {
            await deleteEmployee({id: employee.id}).unwrap();
            setMsg("Xóa nhân viên thành công");
        } catch (err) {
            setMsg('');
            if(!err.success){
                setMsg(err.data.errors?.join('</br>'));
            } else {
                setMsg("Xóa nhân viên thất bại.");
            }
        }
    }

    React.useEffect(() => {
        handleClose()
    }, [isSuccess, isError]);

    return (
        <>
            {(isError || isSuccess) &&
                <MessageAlert
                    message={msg}
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
                <DialogTitle>Bạn muốn xóa nhân viên này?</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Tên: {employee.lastName + ' ' + employee.firstName}
                    </Typography>
                    <Typography variant="body1">
                        Vai trò: {employee.role}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <LoadingButton loading={isLoading} onClick={handleDeleteEmployee}>OK</LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeleteEmployeeDialog;