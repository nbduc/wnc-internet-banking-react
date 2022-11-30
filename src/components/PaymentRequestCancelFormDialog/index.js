import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";

function PaymentRequestCancelFormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason && reason === "backdropClick") return;
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title="Hủy nhắc nợ">
                <IconButton color="secondary" onClick={handleClickOpen}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Hủy nhắc nợ</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            fullWidth
                            multiline
                            minRows={4}
                            placeholder="Nội dung"
                        ></TextField>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PaymentRequestCancelFormDialog;
