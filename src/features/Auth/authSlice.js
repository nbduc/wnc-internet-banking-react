import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";

const userLoginFetch = createAsyncThunk(
    "auth/userLoginFetch",
    async ({ username, password }) => {
        return authApi.login(username, password);
    }
);

const initialState = {
    currentUser: {},
    isLoggingIn: false,
    isLoggedIn: false,
    loginMessage: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLogout: (state, action) => {
            localStorage.removeItem("token");
            state = initialState;
        },
    },
    extraReducers: {
        [userLoginFetch.pending]: (state) => {
            state.isLoggedIn = false;
            state.isLoggingIn = true;
            state.loginMessage = "";
        },
        [userLoginFetch.fulfilled]: (state, action) => {
            const { jwt, user, message } = action.payload;
            localStorage.setItem("token", jwt);
            state.currentUser = user;
            state.isLoggedIn = true;
            state.isLoggingIn = false;
            state.loginMessage = message ? message : "";
        },
        [userLoginFetch.rejected]: (state, action) => {
            const { message } = action.error;
            state.isLoggedIn = false;
            state.isLoggingIn = false;
            state.loginMessage = message;
        },
    },
});

export { userLoginFetch };
export const { userLogout } = authSlice.actions;
export default authSlice.reducer;
