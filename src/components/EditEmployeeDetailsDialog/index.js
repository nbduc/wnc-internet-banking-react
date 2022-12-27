import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { STAFF_ROLES } from "../../common";
import { useCreateEmployeeMutation } from "../../features/Employee/employeeApiSlice";

function EditEmployeeDetailsDialog({ employee, ...props }) {
    const [role, setRole] = React.useState(employee? employee.role : "TELLER");
    const [firstName, setFirstName] = React.useState(employee ? employee.firstName : "");
    const [lastName, setLastName] = React.useState(employee ? employee.lastName : "");
    const [email, setEmail] = React.useState(employee ? employee.email : "");
    const [phone, setPhone] = React.useState(employee ? employee.phone : "");
    const handleRoleInput = (event) => {
        setRole(event.target.value);
    };
    const handleFirstNameInput = (event) => {
        setFirstName(event.target.value);
    };
    const handleLastNameInput = (event) => {
        setLastName(event.target.value);
    };
    const handleEmailInput = (event) => {
        setEmail(event.target.value);
    };
    const handlePhoneInput = (event) => {
        setPhone(event.target.value);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    
    const canSubmit = role && firstName && lastName && email && phone;
    const handleSubmit = async (e) => {
        e.preventDefault();
        
    }
    return (
        <>
            <IconButton aria-label="edit" onClick={handleClickOpen} {...props}>
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Thông tin nhân viên</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <FormControl fullWidth required sx={{marginTop: 2, marginBottom: 1}}>
                            <InputLabel id="role-label">Vai trò</InputLabel>
                            <Select
                                fullWidth
                                labelId="role-select-label"
                                id="role"
                                label="Vai trò"
                                name="role"
                                value={role}
                                onChange={handleRoleInput}
                                sx={{
                                    textAlign: "left",
                                }}
                            >
                                {STAFF_ROLES && Object.entries(STAFF_ROLES).map((r, idx) => 
                                    <MenuItem key={idx} value={r[0]}>{ r[1] }</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="lastName"
                            label="Họ nhân viên"
                            id="last-name"
                            autoComplete="last-name"
                            value={lastName}
                            onChange={handleLastNameInput}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="firstName"
                            label="Tên nhân viên"
                            id="first-name"
                            autoComplete="first-name"
                            value={firstName}
                            onChange={handleFirstNameInput}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="Email"
                            id="email"
                            autoComplete="email"
                            value={email}
                            onChange={handleEmailInput}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="phone"
                            label="Số điện thoại"
                            id="phone"
                            autoComplete="phone"
                            value={phone}
                            onChange={handlePhoneInput}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Thoát</Button>
                    <LoadingButton disabled={!canSubmit} onClick={handleClose}>OK</LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditEmployeeDetailsDialog;
