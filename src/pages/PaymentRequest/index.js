import Box from "@mui/material/Box";
import PaymentRequestFormDialog from "../../components/PaymentRequestFormDialog";
import PaymentRequestList from "../../components/PaymentRequestList";
import DebtList from "../../components/DebtList";
import ControlledAccordion from "../../components/ControlledAccordion";

function PaymentRequestPage(props) {
    return (
        <div>
            <PaymentRequestFormDialog></PaymentRequestFormDialog>
            <Box sx={{ marginTop: 3 }}>
                <ControlledAccordion title="Danh sách nhắc nợ" defaultExpanded>
                    <PaymentRequestList></PaymentRequestList>
                </ControlledAccordion>
                <ControlledAccordion title="Danh sách nợ" defaultExpanded>
                    <DebtList></DebtList>
                </ControlledAccordion>
            </Box>
        </div>
    );
}

export default PaymentRequestPage;