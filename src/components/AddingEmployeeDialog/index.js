import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EmployeeDetailsForm from "../EmployeeDetailsForm";

function AddingEmployeeDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen} {...props}>
                Thêm nhân viên mới
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Thông tin nhân viên</DialogTitle>
                <DialogContent>
                    <EmployeeDetailsForm></EmployeeDetailsForm>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Trở về</Button>
                    <Button onClick={handleClose}>Thêm</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddingEmployeeDialog;
