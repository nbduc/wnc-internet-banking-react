import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EmployeeDetailsForm from "../EmployeeDetailsForm";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

function EditingEmployeeDetailsDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        setOpen(false);
    };
    return (
        <>
            <IconButton aria-label="edit" onClick={handleClickOpen} {...props}>
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Thông tin nhân viên</DialogTitle>
                <DialogContent>
                    <EmployeeDetailsForm></EmployeeDetailsForm>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Thoát</Button>
                    <Button onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditingEmployeeDetailsDialog;
