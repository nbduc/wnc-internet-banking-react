import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function EmployeeDetailsForm() {
    const [role, setRole] = React.useState(null);
    const roleHandleChange = (event) => {
        setRole(event.target.value);
    };
    return (
        <Box component="form" noValidate sx={{ mt: 1 }}>
            <FormControl fullWidth required>
                <InputLabel id="role-label">Vai trò</InputLabel>
                <Select
                    fullWidth
                    labelId="role-select-label"
                    id="role"
                    label="Vai trò"
                    name="role"
                    value={role}
                    onChange={roleHandleChange}
                    sx={{
                        textAlign: "left",
                    }}
                >
                    <MenuItem value={"admin"}>Admin</MenuItem>
                    <MenuItem value={"employee"}>Employee</MenuItem>
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
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="firstName"
                label="Tên nhân viên"
                id="first-name"
                autoComplete="first-name"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                id="email"
                autoComplete="email"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Số điện thoại"
                id="phone"
                autoComplete="phone"
            />
        </Box>
    );
}

export default EmployeeDetailsForm;
