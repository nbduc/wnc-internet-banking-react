import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import LinearIndeterminate from "../LinearIndeterminate";
import PaymentRequestCancelFormDialog from "../PaymentRequestCancelFormDialog";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useSelector } from "react-redux";
import { selectCustomerId } from "../../features/Auth/authSlice";
import { useGetPaymentRequestByCustomerIdQuery } from "../../features/PaymentRequest/paymentRequestApiSlice";

import {
    dateTimeFormater,
    paymentRequestStatusFormatter,
    currencyFormatter,
} from "../../common";

const columns = [
    { id: "createdDate", label: "Thời gian", minWidth: 50, format: dateTimeFormater },
    { id: "toAccountName", label: "Tên người nợ", minWidth: 170 },
    { id: "amount", label: "Số tiền", minWidth: 50, format: currencyFormatter},
    { id: "content", label: "Nội dung nhắc nợ", minWidth: 200, },
    { id: "status", label: "Trạng thái", minWidth: 50, format: paymentRequestStatusFormatter },
    { id: "actions", label: "Thao tác", minWidth: 50, },
];

function createData(id, createdDate, toAccountName, toAccountNumber, amount, content, status) {
    return { id, createdDate, toAccountName, toAccountNumber, amount, content, status };
}

function PaymentRequestList() {
    const customerId = useSelector(selectCustomerId);
    const {
        data: paymentRequests,
        isLoading,
    } = useGetPaymentRequestByCustomerIdQuery(customerId);

    const rows = paymentRequests ? paymentRequests.map((p, idx) => {
        return createData(
            p.id,
            p.createdDate,
            p.toAccountName,
            p.toAccountNumber,
            p.amount,
            p.content,
            p.status);
    }) : [];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column"  }}>
            {isLoading && <LinearIndeterminate/>}
            {rows.length === 0 &&
                <Typography variant="body1" sx={{marginTop: 3}}>
                    Không có nhắc nợ nào.
                </Typography>
            }
            {rows.length !== 0 && 
                <>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column, idx) => (
                                        <TableCell
                                            key={idx}
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
                                    .map((row, idx) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={idx}
                                            >
                                                {columns.map((column, idx) => {
                                                    if (column.id === "actions") {
                                                        return (
                                                            <TableCell
                                                                key={idx}
                                                                align={column.align}
                                                            >
                                                                {row.status !== "DELETED" && 
                                                                    <PaymentRequestCancelFormDialog id={row.id}></PaymentRequestCancelFormDialog>
                                                                }
                                                            </TableCell>
                                                        );
                                                    }
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell
                                                            key={idx}
                                                            align={column.align}
                                                        >
                                                            {column.format ? column.format(value) : value}
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
                </>
            }
        </Box>
    );
}

export default PaymentRequestList;
