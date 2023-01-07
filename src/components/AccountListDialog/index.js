import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import LinearIndeterminate from "../LinearIndeterminate";

function AccountListDialog({ onSetAccount, accountList, loading, ...props }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event) => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen} {...props}>Chọn từ danh sách</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Danh sách tài khoản</DialogTitle>
                <DialogContent>
                    {loading && <LinearIndeterminate/>}
                    {(!accountList || accountList?.length === 0) &&
                        <Typography variant="body1">
                            Không có danh sách để hiển thị.
                        </Typography>
                    }
                    {accountList?.length !== 0 &&
                        <List>
                            {accountList?.map((account, idx) => 
                                <ListItemButton key={idx} onClick={(e) => {
                                    handleClose(e);
                                    onSetAccount(account.accountNumber, account.accountName);
                                }}>
                                    <ListItemText
                                        primary={account.accountName}
                                        secondary={account.accountNumber}
                                    />
                                </ListItemButton>
                            )}
                        </List>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Trở về</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AccountListDialog;
