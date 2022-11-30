import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

function DebtorListDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>Chọn từ danh sách</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Danh sách người nợ</DialogTitle>
                <DialogContent>
                    <List>
                        <ListItemButton>
                            <ListItemText
                                primary="Người nợ"
                                secondary="Số tài khoản"
                            />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemText
                                primary="Người nợ"
                                secondary="Số tài khoản"
                            />
                        </ListItemButton>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Trở về</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function PaymentRequestFormDialog() {
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
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="account-number"
                            label="Số tài khoản người nợ"
                            id="account-number"
                            autoComplete="account-number"
                        />
                        <DebtorListDialog></DebtorListDialog>
                        <TextField
                            margin="normal"
                            fullWidth
                            name="name"
                            label="Tên người nợ"
                            id="name"
                            disabled={true}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="amount"
                            label="Số tiền (đ)"
                            id="amount"
                            type="number"
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
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleClose}>Gửi nhắc nợ</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PaymentRequestFormDialog;
