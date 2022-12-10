import { Grid } from "@mui/material";
import ControlledAccordion from "../../components/ControlledAccordion";
import AccountCard from "../../components/AccountCard/index.js";
import { useGetAccountsByCustomerIdQuery } from "../../features/Account/accountApiSlice";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function HomePage() {
    const { data: accountList, isLoading } = useGetAccountsByCustomerIdQuery(1);
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <ControlledAccordion title="Tài khoản thanh toán" defaultExpanded>
                <Grid container spacing={2}>
                    {accountList.map((account, idx) => 
                        <Grid item xs={4} key={idx}>
                            <AccountCard
                                accountName={account.accountName}
                                accountNumber={account.accountNumber}
                                accountBalance={account.currentBalance}
                            ></AccountCard>
                        </Grid>
                    )}
                    {/* <Grid item xs={4}>
                        <AccountCard
                            accountName={"Sample checking 1"}
                            accountNumber={"0112345678"}
                            accountBalance={"9900000"}
                        ></AccountCard>
                    </Grid>
                    <Grid item xs={4}>
                        <AccountCard
                            accountName={"Sample checking 2"}
                            accountNumber={"0112345678"}
                            accountBalance={"9900000"}
                        ></AccountCard>
                    </Grid> */}
                </Grid>
            </ControlledAccordion>
        </>
    );
}
