import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const columns = [
    { id: "name", label: "Tên người nhận", minWidth: 170 },
    { id: "accountNumber", label: "Số tài khoản", minWidth: 100 },
    {
        id: "bank",
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

function createData(name, accountNumber, bank) {
    return { name, accountNumber, bank };
}

const rows = [
    createData("India", "IN", 1324171354),
    createData("China", "CN", 1403500365),
    createData("Italy", "IT", 60483973),
    createData("United States", "US", 327167434),
    createData("Canada", "CA", 37602103),
    createData("Australia", "AU", 25475400),
    createData("Germany", "DE", 83019200),
    createData("Ireland", "IE", 4857000),
    createData("Mexico", "MX", 126577691),
    createData("Japan", "JP", 126317000),
    createData("France", "FR", 67022000),
    createData("United Kingdom", "GB", 67545757),
    createData("Russia", "RU", 146793744),
    createData("Nigeria", "NG", 200962417),
    createData("Brazil", "BR", 210147125),
];

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

    return (
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
                                        key={row.name}
                                    >
                                        {columns.map((column) => {
                                            if (column.id === "actions") {
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        <Tooltip title="Chỉnh sửa">
                                                            <IconButton color="primary">
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Xóa">
                                                            <IconButton color="secondary">
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
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
    );
}

function RecipientPage(props) {
    return <RecipientList></RecipientList>;
}

export default RecipientPage;
