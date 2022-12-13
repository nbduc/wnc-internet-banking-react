import { createSlice } from "@reduxjs/toolkit";
import { authApiSlice } from "./authApiSlice";
import { ROLES } from "../../common";
import jwtDecode from "jwt-decode";

const matchRole = (role) => {
    switch (role) {
        case 'CUSTOMER': return ROLES.customer;
        case 'TELLER': return ROLES.employee;
        case 'ADMINISTRATOR': return ROLES.admin;
        default: return ROLES.customer
    }  
}

const initialState = {
    currentUser: {
        userId: null,
        email: null,
        firstName: null,
        lastName: null,
        phone: null,
        role: {
            roleName: null,
            customerId: null,
            staffId: null,
        },
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
                const { token } = action.payload;
                const { id, email, firstName, lastName, phone, role, customerId, staffId } = jwtDecode(token);
                state.currentUser = {
                    userId: id,
                    email,
                    firstName,
                    lastName,
                    phone,
                    role: {
                        roleName: matchRole(role),
                        customerId,
                        staffId,
                    }
                }
                state.accessToken = token;
            })
            .addMatcher(authApiSlice.endpoints.refresh.matchFulfilled, (state, action) => {
                const { token } = action.payload;
                const { id, email, firstName, lastName, phone, role, customerId, staffId } = jwtDecode(token);
                state.currentUser = {
                    userId: id,
                    email,
                    firstName,
                    lastName,
                    phone,
                    role: {
                        roleName: matchRole(role),
                        customerId,
                        staffId,
                    }
                }
                state.accessToken = token;
            })
    },
});

export const { logout, setCurrentUser, setAccessToken } = authSlice.actions;
export const selectCurrentToken = (state) => state.auth.accessToken;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectRole = (state) => state.auth.currentUser.role.roleName;
export const selectAccessToken = (state) => state.auth.accessToken;
export default authSlice.reducer;
