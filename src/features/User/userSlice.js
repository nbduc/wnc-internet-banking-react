import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    forgotPassword: {
        email: null,
        otpCode: null,
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEmailForgotPassword: (state, action) => {
            state.forgotPassword.email = action.payload;
        },
        setOtpCodeForgotPassword: (state, action) => {
            state.forgotPassword.otpCode = action.payload;
        }
    }
});

export const { setEmailForgotPassword, setOtpCodeForgotPassword } = userSlice.actions;
export const selectForgotPasswordInfor = (state) => state.user.forgotPassword;
export default userSlice.reducer;