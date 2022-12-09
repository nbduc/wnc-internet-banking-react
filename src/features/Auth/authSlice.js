import { createSlice } from "@reduxjs/toolkit";
import { authApiSlice } from "./authApiSlice";
import { ROLES } from "../../common";

const initialState = {
    currentUser: {
        email: null,
        role: null,
    },
    accessToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => initialState,
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApiSlice.endpoints.login.matchFulfilled, (state, action) => {
                const { email, token, role } = action.payload;
                state.currentUser.email = email;
                state.currentUser.role = role || ROLES.customer;
                state.accessToken = token;
            })
            .addMatcher(authApiSlice.endpoints.refresh.matchFulfilled, (state, action) => {
                const { email, token, role } = action.payload;
                state.currentUser.email = email;
                state.currentUser.role = role || ROLES.customer;
                state.accessToken = token;
            })
    },
});

export const { logout, setCurrentUser, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
