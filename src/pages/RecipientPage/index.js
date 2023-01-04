import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useSelector } from "react-redux";
import EditRecipientDetailsDialog from "../../components/EditRecipientDetailsDialog";
import DeleteRecipientDetailsDialog from "../../components/DeleteRecicpientDialog";
import { useMemo } from "react";
import LoadingBackdrop from "../../components/LoadingBackdrop";
import { selectRecipientListStatus } from "../../features/Recipient/recipientSlice";
import { selectRecipientList } from "../../features/Recipient/recipientSlice";
import AddRecipientDialog from "../../components/AddRecipientDialog";
import { Typography } from "@mui/material";

const columns = [
    { id: "nickName", label: "Tên người nhận", minWidth: 170 },
    { id: "accountNumber", label: "Số tài khoản", minWidth: 100 },
    {
        id: "bankName",
        label: "Ngân hàng",
        minWidth: 170,
    },
    {
        id: "actions",
        label: "Thao tác",
        minWidth: 100,
        align: "left",
    },
];

const createData = (id, nickName, accountNumber, bankId, bankName) => {
    return { id, nickName, accountNumber, bankId, bankName }
}

function RecipientList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const recipients = useSelector(selectRecipientList);
    const {isLoading} = useSelector(selectRecipientListStatus);

    const sortedRecipients = useMemo(() => {
        const sortedRecipients = recipients.slice();
        sortedRecipients.sort((a, b) => b.createdDate.localeCompare(a.createdDate));
        return sortedRecipients;
    }, [recipients]);

    const rows = useMemo(() => {
        return sortedRecipients.map((recipient, idx) => createData(
            recipient.id,
            recipient.nickName || recipient.accountName,
            recipient.accountNumber,
            recipient.bank.bankId,
            recipient.bank.bankName
        ));
    }, [sortedRecipients]);

    return (
        <>
            <LoadingBackdrop open={isLoading} />
            {rows?.length === 0 && <Typography variant="body1">Không có người nhận nào.</Typography>}
            {rows?.length !== 0 &&
                <Paper sx={{ width: "100%" }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{
                                                minWidth: column.minWidth,
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.id}
                                            >
                                                {columns.map((column) => {
                                                    if (column.id === "actions") {
                                                        return (
                                                            <TableCell
                                                                key={column.id}
                                                                align={column.align}
                                                            >
                                                                <EditRecipientDetailsDialog recipient={row} />
                                                                <DeleteRecipientDetailsDialog recipient={row} />
                                                            </TableCell>
                                                        );
                                                    }
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                        >
                                                            {column.format &&
                                                            typeof value === "number"
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            }
        </>
    );
}

function RecipientPage(props) {
    return (
        <>
            <AddRecipientDialog
                sx={{ marginBottom: 3 }}
            ></AddRecipientDialog>
            <RecipientList></RecipientList>
        </>
    );
}

export default RecipientPage;

/*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
* */