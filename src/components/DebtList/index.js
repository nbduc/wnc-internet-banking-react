import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import LinearIndeterminate from "../LinearIndeterminate";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import PaymentFormDialog from "../PaymentFormDialog";
import { useGetDebtListQuery } from "../../features/PaymentRequest/paymentRequestApiSlice";
import {
    dateTimeFormater,
    paymentRequestStatusFormatter,
    currencyFormatter
} from "../../common";

const columns = [
    { id: "createdDate", label: "Thời gian", minWidth: 50, format: dateTimeFormater},
    { id: "fromCustomer", label: "Tên người nhắc nợ", minWidth: 170 },
    { id: "amount", label: "Số tiền", minWidth: 100, format: currencyFormatter },
    { id: "content", label: "Nội dung nhắc nợ", minWidth: 170 },
    { id: "status", label: "Trạng thái", minWidth: 50, format: paymentRequestStatusFormatter },
    { id: "actions", label: "Thao tác", minWidth: 50 },
];

function createData(id, createdDate, fromCustomer, accountName, accountNumber, amount, content, status) {
    return { id, createdDate, fromCustomer, amount, accountName, accountNumber, content, status };
}

/*
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1

1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
*/
function DebtList() {
    const { data: debtList, isLoading } = useGetDebtListQuery();
    const [debtStatusFilter, setDebtStatusFilter] = React.useState("DRAFT");
    const handleDebtStatusFilter = (e) => {
        setDebtStatusFilter(e.target.value);
    }
    const rows = debtList
        ? debtList
            .filter(debt => {
                return debtStatusFilter === "all" ? true : debt.status === debtStatusFilter
            })
            .map((debt) => {
                return createData(
                    debt.id,
                    debt.createdDate,
                    debt.fromCustomer,
                    debt.accountName,
                    debt.accountNumber,
                    debt.amount,
                    debt.content,
                    debt.status
                );
            })
        : [];

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
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <FormControl sx={{ m: 1, minWidth: 180, alignSelf: "flex-start" }} size="small">
                <InputLabel id="status">Trạng thái nợ</InputLabel>
                <Select
                    fullWidth
                    labelId="debt-status-label"
                    id="status"
                    label="Trạng thái nợ"
                    name="status"
                    value={debtStatusFilter}
                    onChange={handleDebtStatusFilter}
                    sx={{
                        textAlign: "left",
                    }}
                >
                    <MenuItem value={"all"}>Tất cả</MenuItem>
                    <MenuItem value={"DRAFT"} >Chưa thanh toán</MenuItem>
                </Select>
            </FormControl>
            {isLoading && <LinearIndeterminate/>}
            {rows.length === 0 &&
                <Typography variant="body1" sx={{marginTop: 3}}>
                    Danh sách nợ trống.
                </Typography>
            }
            {rows.length !== 0 && 
                <>
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
                                    .map((row, idx) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={idx}
                                            >
                                                {columns.map((column) => {
                                                    if (column.id === "actions") {
                                                        return (
                                                            <TableCell
                                                                key={column.id}
                                                                align={column.align}
                                                            >
                                                                {row.status === "DRAFT" &&
                                                                    <PaymentFormDialog debt={row} />
                                                                }
                                                            </TableCell>
                                                        );
                                                    }
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell
                                                            key={column.id}
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

export default DebtList;
