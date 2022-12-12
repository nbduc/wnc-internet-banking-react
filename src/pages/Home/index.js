import { Grid } from "@mui/material";
import ControlledAccordion from "../../components/ControlledAccordion";
import AccountCard from "../../components/AccountCard/index.js";
import { useGetAccountsByCustomerIdQuery } from "../../features/Account/accountApiSlice";
import { useSelector } from "react-redux";
import LoadingBackdrop from "../../components/LoadingBackdrop";

export default function HomePage() {
    const userId = useSelector(state => state.auth.currentUser.userId);
    const { data: accountList, isLoading } = useGetAccountsByCustomerIdQuery(userId);
    return (
        <>
            <LoadingBackdrop open={isLoading} />
            <ControlledAccordion title="Tài khoản thanh toán" defaultExpanded>
                <Grid container spacing={2}>
                    {accountList?.map((account, idx) => 
                        <Grid item xs={4} key={idx}>
                            <AccountCard
                                accountName={account.accountName}
                                accountNumber={account.accountNumber}
                                accountBalance={account.currentBalance}
                            ></AccountCard>
                        </Grid>
                    )}
                </Grid>
            </ControlledAccordion>
        </>
    );
}
