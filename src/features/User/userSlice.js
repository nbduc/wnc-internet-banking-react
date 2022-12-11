import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    forgotPassword: {
        email: null,
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEmailForgotPassword: (state, action) => {
            state.forgotPassword.email = action.payload;
        }
    }
});

export const { setEmailForgotPassword } = userSlice.actions;
export default userSlice.reducer;