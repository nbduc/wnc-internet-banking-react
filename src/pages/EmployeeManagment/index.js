import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AddEmployeeDialog from "../../components/AddEmployeeDialog";
import EditEmployeeDetailsDialog from "../../components/EditEmployeeDetailsDialog";
import { useGetAllEmployeesQuery } from "../../features/Employee/employeeApiSlice";
import LoadingBackdrop from "../../components/LoadingBackdrop";
import { Typography } from "@mui/material";
import DeleteEmployeeDialog from "../../components/DeleteEmployeeDialog";

const columns = [
    { id: "id", label: "Mã nhân viên", minWidth: 30 },
    { id: "name", label: "Tên nhân viên", minWidth: 100 },
    { id: "role", label: "Vai trò", minWidth: 30, },
    { id: "actions", label: "Thao tác", minWidth: 50 },
];

function createData(id, name, firstName, lastName, email, phone, role, active ) {
    return { id, name, firstName, lastName, email, phone, role, active  };
}

function EmployeeList() {
    const { data: employeeList, isFetching } = useGetAllEmployeesQuery();
    const rows = React.useMemo(() => {
        return employeeList?.map(e => createData(
            e.id,
            e.firstName + ' ' + e.lastName,
            e.firstName,
            e.lastName,
            e.email,
            e.phone,
            e.role,
            e.active
        ));
    }, [employeeList]);

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
        <Box sx={{ width: "100%" }}>
            <LoadingBackdrop open={isFetching} />
            {rows?.length === 0 &&
                <Typography variant="body1" sx={{marginTop: 3}}>Danh sách nhân viên trống.</Typography>
            }
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
                        {rows?.slice(
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
                                                        <EditEmployeeDetailsDialog employee={row}></EditEmployeeDetailsDialog>
                                                        <DeleteEmployeeDialog employee={row}></DeleteEmployeeDialog>
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
                count={rows?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
}

function EmployeeManagementPage() {
    return (
        <>
            <AddEmployeeDialog
                sx={{ marginBottom: 3 }}
            ></AddEmployeeDialog>
            <Paper>
                <EmployeeList></EmployeeList>
            </Paper>
        </>
    );
}

export default EmployeeManagementPage;
