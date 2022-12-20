import { Grid } from "@mui/material";
import ControlledAccordion from "../../components/ControlledAccordion";
import AccountCard from "../../components/AccountCard/index.js";
import { useSelector } from "react-redux";
import LoadingBackdrop from "../../components/LoadingBackdrop";
import { selectAccountList, selectAccountListStatus } from "../../features/Account/accountSlice";

export default function HomePage() {
    const accountList = useSelector(selectAccountList);
    const {isLoading} = useSelector(selectAccountListStatus)

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
