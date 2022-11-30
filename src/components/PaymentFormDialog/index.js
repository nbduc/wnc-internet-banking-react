import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import PaymentsIcon from "@mui/icons-material/Payment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function PaymentFormDialog() {
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
            <Tooltip title="Thanh toán">
                <IconButton color="primary" onClick={handleClickOpen}>
                    <PaymentsIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Tiến hành thanh toán</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Chọn một tài khoản dùng để thanh toán nợ.
                    </DialogContentText>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <FormControl fullWidth required>
                            <InputLabel id="demo-simple-select-label">
                                Tài khoản nguồn
                            </InputLabel>
                            <Select
                                fullWidth
                                labelId="from-account-select-label"
                                id="from-account"
                                label="Tài khoản nguồn"
                                name="from-account"
                                sx={{
                                    textAlign: "left",
                                }}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleClose}>Thanh toán</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PaymentFormDialog;
