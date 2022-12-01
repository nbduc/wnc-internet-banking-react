import InternalTransferForm from "../../components/InternalTransferForm";
import ExternalTransferForm from "../../components/ExternalTransferForm";
import ControlledAccordion from "../../components/ControlledAccordion";

function TransferPage() {
    return (
        <>
            <ControlledAccordion title={"Chuyển tiền cùng ngân hàng"}>
                <InternalTransferForm></InternalTransferForm>
            </ControlledAccordion>
            <ControlledAccordion title={"Chuyển tiền liên ngân hàng"}>
                <ExternalTransferForm></ExternalTransferForm>
            </ControlledAccordion>
        </>
    );
}

export default TransferPage;
