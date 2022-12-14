import {
    List,
    ListItem,
    ListItemButton,
    Typography,
    Grid,
} from "@mui/material";
import LinearIndeterminate from "../LinearIndeterminate";
import { TRANSACTION_TYPES, TRANSACTION_STATUSES } from "../../common";
import { currencyFormatter, dateTimeFormater } from "../../common";

export default function TransactionHistoryList({history, loading}) {
    return (
        <>
            {loading && <LinearIndeterminate/>}
            {history?.length === 0 &&
                <Typography variant="body1" sx={{ textAlign: "center", marginTop: 5 }}>
                    Không có lịch sử giao dịch.
                </Typography>
            }
            {history?.length !== 0 && 
                <List>
                    {history?.map((item, idx) => {
                        return (
                            <ListItem key={idx}>
                                <ListItemButton divider>
                                    <Grid container spacing={2}>
                                        <Grid item xs={10}>
                                            <Typography
                                                component="div"
                                                variant="body1"
                                                color="text.primary"
                                            >
                                                {TRANSACTION_TYPES[item.transactionType]}
                                            </Typography>
                                            <Typography
                                                component="div"
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {dateTimeFormater(item.transactionDate)}
                                            </Typography>
                                            <Typography
                                                component="div"
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {item.content}
                                            </Typography>
                                            <Typography
                                                component="div"
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {TRANSACTION_STATUSES[item.transactionStatus]}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography
                                                component="div"
                                                variant="body1"
                                                color="text.primary"
                                            >
                                                {currencyFormatter(item.amount)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        );
                        
                    })}
                </List>
            }
        </>
    );
}
