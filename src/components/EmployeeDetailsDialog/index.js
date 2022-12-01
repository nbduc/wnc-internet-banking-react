import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EmployeeDetailsForm from "../EmployeeDetailsForm";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import IconButton from "@mui/material/IconButton";

function EmployeeDetailsDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        setOpen(false);
    };
    return (
        <>
            <IconButton
                aria-label="detail"
                onClick={handleClickOpen}
                {...props}
            >
                <RemoveRedEyeIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Thông tin nhân viên</DialogTitle>
                <DialogContent>
                    <EmployeeDetailsForm></EmployeeDetailsForm>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Thoát</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EmployeeDetailsDialog;
