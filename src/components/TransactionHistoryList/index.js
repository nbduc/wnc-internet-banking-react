import { List, ListItem, Divider, ListItemText } from "@mui/material";

export default function TransactionHistoryList(props) {
    return (
        <List>
            <ListItem>
                <ListItemText
                    primary="Tên giao dịch"
                    secondary="Nội dung giao dịch"
                />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText
                    primary="Tên giao dịch"
                    secondary="Nội dung giao dịch"
                />
            </ListItem>
        </List>
    );
}
