import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { FormHelperText } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { STAFF_ROLES } from "../../common";
import { useCreateEmployeeMutation } from "../../features/Employee/employeeApiSlice";
import { useCreateUserMutation } from "../../features/User/userApiSlice";
import * as Yup from "yup";
import useFormValidator from "../../hooks/useFormValidator";
import MessageAlert from "../MessageAlert";

/*
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
187
*/
function AddEmployeeDialog(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [role, setRole] = React.useState("TELLER");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [msg, setMsg] = React.useState("");
    const handlePasswordInput = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordInput = (event) => {
        setConfirmPassword(event.target.value);
    };
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
    const createEmployeeSchema = Yup.object().shape({
        email: Yup.string().email('Email không hợp lệ').required("Email là bắt buộc."),
        password: Yup.string().required("Mật khẩu là bắt buộc.").min(7, "Mật khẩu phải chứa ít nhất 7 kí tự."),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Nhập lại mật khẩu phải khớp.').required("Nhập lại mật khẩu là bắt buộc."),
        role: Yup.string().required("Vai trò là bắt buộc."),
        firstName: Yup.string().required("Tên là bắt buộc."),
        lastName: Yup.string().required("Họ là bắt buộc."),
        phone: Yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ').required("Số điện thoại là bắt buộc."),
    });
    const { errors, texts, validate } = useFormValidator(createEmployeeSchema);

    const resetForm = () => {
        setPassword("");
        setConfirmPassword("");
        setRole("TELLER");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
    }

    const [createUser, { isLoading: createUserLoading, isError: createUserError, isSuccess: createUserSuccess }] = useCreateUserMutation();
    const [ createEmployee, {isLoading: createEmployeeLoading, isError: createEmployeeError, isSuccess: createEmployeeSuccess} ] = useCreateEmployeeMutation();
    const canSubmit = role && firstName && lastName && email && phone;
    const isLoading = createUserLoading || createEmployeeLoading;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await validate({
            email,
            password,
            confirmPassword,
            role,
            firstName,
            lastName,
            phone
        });
        if (data === null) return;
        try {
            const newUser = await createUser({
                email,
                password
            }).unwrap();
            await createEmployee({
                userId: newUser?.data,
                role,
                firstName,
                lastName,
                email,
                phone
            }).unwrap();
            setOpen(false);
            setMsg("Thêm nhân viên thành công");
        } catch (err) {
            setMsg('');
            if(!err.success){
                setMsg(err.data.errors?.join('</br>'));
            } else {
                setMsg("Không thể thực hiện.");
            }
        }
    }

    React.useEffect(() => {
        resetForm();
    }, [open]);

    return (
        <>
            {(createUserError || createEmployeeError) && (
                <MessageAlert
                    message={msg? msg : "Đã có lỗi."}
                    hidden={false}
                    severity="error"
                ></MessageAlert>
            )}
            {(createUserSuccess && createEmployeeSuccess) && (
                <MessageAlert
                    message={"Tạo tài khoản khách hàng thành công."}
                    hidden={false}
                    severity="success"
                ></MessageAlert>
            )}
            <Button variant="outlined" onClick={handleClickOpen} {...props}>
                Thêm nhân viên mới
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Thông tin nhân viên</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
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
                            name="password"
                            label="Mật khẩu"
                            id="password"
                            value={password}
                            onChange={handlePasswordInput}
                            type="password"
                            error={errors("password")}
                            helperText={texts("password")}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Nhập lại mật khẩu"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordInput}
                            type="password"
                            error={errors("confirmPassword")}
                            helperText={texts("confirmPassword")}
                        />
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
                                error={errors("role")}
                            >
                                {STAFF_ROLES && Object.entries(STAFF_ROLES).map((r, idx) => 
                                    <MenuItem key={idx} value={r[0]}>{ r[1] }</MenuItem>
                                )}
                            </Select>
                            <FormHelperText>{texts("role")}</FormHelperText>
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
                            error={errors("lastName")}
                            helperText={texts("lastName")}
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
                            error={errors("firstName")}
                            helperText={texts("firstName")}
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
                            error={errors("phone")}
                            helperText={texts("phone")}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Trở về</Button>
                    <LoadingButton
                        loading={isLoading}
                        disabled={!canSubmit}
                        onClick={handleSubmit}>Thêm</LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddEmployeeDialog;
