import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

function AccountListDialog() {
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
                <DialogTitle>Danh sách tài khoản</DialogTitle>
                <DialogContent>
                    <List>
                        <ListItemButton onClick={handleClose}>
                            <ListItemText
                                primary="Chủ tài khoản"
                                secondary="Tên tài khoản"
                            />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton onClick={handleClose}>
                            <ListItemText
                                primary="Chủ tài khoản"
                                secondary="Tên tài khoản"
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

export default AccountListDialog;
