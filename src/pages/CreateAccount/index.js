import { Box, TextField, Typography, Paper } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import MessageAlert from "../../components/MessageAlert";
import { useState } from "react";
import { useCreateUserMutation } from "../../features/User/userApiSlice";
import { useCreateCustomerMutation } from "../../features/Customer/customerApiSlice";
import * as Yup from "yup";
import useFormValidator from "../../hooks/useFormValidator";

function CreateAccountPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [msg, setMsg] = useState('');

    const handleEmailInput = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordInput = (event) => {
        setPassword(event.target.value);
    }
    const handleConfirmPasswordInput = (event) => {
        setConfirmPassword(event.target.value);
    }
    const handleFirstNameInput = (event) => {
        setFirstName(event.target.value);
    }
    const handleLastNameInput = (event) => {
        setLastName(event.target.value);
    }
    const handlePhoneInput = (event) => {
        setPhone(event.target.value);
    }

    const [createUser, {
        isLoading: isCreateUserLoading,
        isError: isCreateUserError,
    }] = useCreateUserMutation();
    const [createCustomer, {
        isLoading: isCreateCustomerLoading,
        isError: isCreateCustomerError,
        isSuccess: createCustomerSuccess
    }] = useCreateCustomerMutation();

    const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const createAccountSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email không đúng định dạng.')
            .required('Email là bắt buộc'),
        password: Yup.string()
            .min(8, 'Mật khẩu phải chứa ít nhất 8 ký tự.')
            .required('Mật khẩu là bắt buộc.'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Xác nhận mật khẩu phải khớp.'),
        firstName: Yup.string().required('Tên là bắt buộc.'),
        lastName: Yup.string().required('Họ là bắt buộc.'),
        phone: Yup.string()
            .matches(phoneRegExp, 'Số điện thoại không đúng định dạng.')
            .required('Số điện thoại là bắt buộc.'),
    });
    const { errors, texts, validate } = useFormValidator(createAccountSchema);

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFirstName("");
        setLastName("");
        setPhone("");
        setMsg("");
    }

    const canSubmit = email && password && confirmPassword && firstName && lastName && phone;
    const isLoading = isCreateUserLoading || isCreateCustomerLoading;
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await validate({
            email,
            password,
            confirmPassword,
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
            await createCustomer({
                userId: newUser?.data,
                firstName,
                lastName,
                email,
                phone,
            }).unwrap();
            resetForm();
        } catch (err) {
            setMsg('');
            if(!err.success){
                setMsg(err.data.errors?.join('</br>'));
            } else {
                setMsg("Không thể thực hiện.");
            }
        }
    };
    const loadingIndicator =
        isCreateUserLoading ? "...Đang tạo tài khoản người dùng" : "...Đang thiết lập thông tin khách hàng" ;
    return (
        <>
            {(isCreateUserError || isCreateCustomerError) && (
                <MessageAlert
                    message={msg? msg : "Đã có lỗi."}
                    hidden={false}
                    severity="error"
                ></MessageAlert>
            )}
            {createCustomerSuccess && (
                <MessageAlert
                    message={"Tạo tài khoản khách hàng thành công."}
                    hidden={false}
                    severity="success"
                ></MessageAlert>
            )}
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: 3,
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1, minWidth: "50%" }}
                >
                    <Typography sx={{ textAlign: "left", marginTop: 3 }}>
                        Thông tin đăng nhập
                    </Typography>
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
                        error={errors('email')}
                        helperText={texts('email')}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        name="password"
                        label="Mật khẩu"
                        id="password"
                        autoComplete="password"
                        value={password}
                        onChange={handlePasswordInput}
                        error={errors('password')}
                        helperText={texts('password')}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        name="confirmPassword"
                        label="Xác nhận lại Mật khẩu"
                        id="confirm-password"
                        autoComplete="confirm-password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordInput}
                        error={errors('confirmPassword')}
                        helperText={texts('confirmPassword')}
                    />
                    <Typography sx={{ textAlign: "left", marginTop: 3 }}>
                        Thông tin cá nhân
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="lastName"
                        label="Họ và tên lót"
                        id="last-name"
                        value={lastName}
                        onChange={handleLastNameInput}
                        error={errors('lastName')}
                        helperText={texts('lastName')}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="firstName"
                        label="Tên"
                        id="first-name"
                        value={firstName}
                        onChange={handleFirstNameInput}
                        error={errors('firstName')}
                        helperText={texts('firstName')}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="phone"
                        label="Số điện thoại"
                        id="phone"
                        value={phone}
                        onChange={handlePhoneInput}
                        error={errors('phone')}
                        helperText={texts('phone')}
                    />
                    <Typography variant="body2">
                        Hệ thống tự phát sinh 01 tài khoản thanh toán cho tài khoản khách hàng.
                    </Typography>
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        loading={isLoading}
                        disabled={!canSubmit}
                        loadingIndicator={loadingIndicator}
                    >
                        Tạo tài khoản
                    </LoadingButton>
                </Box>
            </Paper>
        </>
    );
}

export default CreateAccountPage;
