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
import Tooltip from "@mui/material/Tooltip";
import { FormHelperText } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { STAFF_ROLES } from "../../common";
import { useEditEmployeeMutation } from "../../features/Employee/employeeApiSlice";
import MessageAlert from "../MessageAlert";
import * as Yup from "yup";
import useFormValidator from "../../hooks/useFormValidator";

function EditEmployeeDetailsDialog({ employee, ...props }) {
    const id = employee.id;
    const [role, setRole] = React.useState(employee? employee.role : "TELLER");
    const [firstName, setFirstName] = React.useState(employee ? employee.firstName : "");
    const [lastName, setLastName] = React.useState(employee ? employee.lastName : "");
    const [email, setEmail] = React.useState(employee ? employee.email : "");
    const [phone, setPhone] = React.useState(employee ? employee.phone : "");
    const [msg, setMsg] = React.useState("");
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

    const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    const editEmployeeSchema = Yup.object().shape({
        role: Yup.string().required("Vai tr?? l?? b???t bu???c."),
        firstName: Yup.string().required("T??n l?? b???t bu???c."),
        lastName: Yup.string().required("H??? l?? b???t bu???c."),
        email: Yup.string().email('Email kh??ng h???p l???').required("Email l?? b???t bu???c."),
        phone: Yup.string().matches(phoneRegExp, 'S??? ??i???n tho???i kh??ng h???p l???').required("S??? ??i???n tho???i l?? b???t bu???c."),
    });
    const { errors, texts, validate } = useFormValidator(editEmployeeSchema);

    const [editEmployee, { isLoading, isError, isSuccess}] = useEditEmployeeMutation();
    const canSubmit = role && firstName && lastName && email && phone;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await validate({
            role,
            firstName,
            lastName,
            email,
            phone
        });
        if (data === null) return;
        try {
            await editEmployee({
                id,
                role,
                firstName,
                lastName,
                email,
                phone
            }).unwrap();
            setMsg("C???p nh???t th??nh c??ng.");
            setOpen(false);
        } catch (err) {
            setMsg('');
            if(!err.success){
                setMsg(err.data.errors?.join('</br>'));
            } else {
                setMsg("Kh??ng th??? th???c hi???n.");
            }
        }
    }
    return (
        <>
            {(isError || isSuccess) &&
                <MessageAlert
                    message={msg}
                    hidden={false}
                    severity={isError? "error" : "success"}
                ></MessageAlert>
            }
            <Tooltip title="Ch???nh s???a">
                <IconButton aria-label="edit" onClick={handleClickOpen} {...props}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Th??ng tin nh??n vi??n</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <FormControl fullWidth required sx={{marginTop: 2, marginBottom: 1}}>
                            <InputLabel id="role-label">Vai tr??</InputLabel>
                            <Select
                                fullWidth
                                labelId="role-select-label"
                                id="role"
                                label="Vai tr??"
                                name="role"
                                value={role}
                                onChange={handleRoleInput}
                                sx={{
                                    textAlign: "left",
                                }}
                                error={errors("role")}
                            >
                                {STAFF_ROLES && Object.entries(STAFF_ROLES).map((r, idx) => 
                                    <MenuItem key={idx} value={r[0]}>{ r[1] }</MenuItem>
                                )}
                                <FormHelperText>{texts("role")}</FormHelperText>
                            </Select>
                        </FormControl>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="lastName"
                            label="H??? nh??n vi??n"
                            id="last-name"
                            autoComplete="last-name"
                            value={lastName}
                            onChange={handleLastNameInput}
                            error={errors("lastName")}
                            helperText={texts("lastName")}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="firstName"
                            label="T??n nh??n vi??n"
                            id="first-name"
                            autoComplete="first-name"
                            value={firstName}
                            onChange={handleFirstNameInput}
                            error={errors("firstName")}
                            helperText={texts("firstName")}
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
                            error={errors("email")}
                            helperText={texts("email")}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="phone"
                            label="S??? ??i???n tho???i"
                            id="phone"
                            autoComplete="phone"
                            value={phone}
                            onChange={handlePhoneInput}
                            error={errors("phone")}
                            helperText={texts("phone")}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Tho??t</Button>
                    <LoadingButton loading={isLoading} disabled={!canSubmit} onClick={handleSubmit}>OK</LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditEmployeeDetailsDialog;
