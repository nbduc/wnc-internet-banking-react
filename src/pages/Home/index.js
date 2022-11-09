import { Grid } from "@mui/material";
import ControlledAccordion from "../../components/ControlledAccordion";
import AccountCard from "../../components/AccountCard/index.js";

export default function HomePage() {
    return (
        <ControlledAccordion title="Tài khoản thanh toán">
            <Grid container spacing={2}>
                <Grid item xs={4}>
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
                </Grid>
            </Grid>
        </ControlledAccordion>
    );
}
