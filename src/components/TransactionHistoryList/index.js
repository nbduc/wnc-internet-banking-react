import {
    List,
    ListItem,
    ListItemButton,
    Typography,
    Grid,
} from "@mui/material";

export default function TransactionHistoryList(props) {
    const currencyFormatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return (
        <List sx={{ minWidth: "50%" }}>
            <ListItem>
                <ListItemButton divider>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Typography
                                component="div"
                                variant="body1"
                                color="text.primary"
                            >
                                Tên giao dịch
                            </Typography>
                            <Typography
                                component="div"
                                variant="body2"
                                color="text.secondary"
                            >
                                1/12/2022 1:00
                            </Typography>
                            <Typography
                                component="div"
                                variant="body2"
                                color="text.secondary"
                            >
                                Nội dung giao dịch
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography
                                component="div"
                                variant="body1"
                                color="text.primary"
                            >
                                +{currencyFormatter.format(3000000)}
                            </Typography>
                        </Grid>
                    </Grid>
                </ListItemButton>
            </ListItem>
        </List>
    );
}
