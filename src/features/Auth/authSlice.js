import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";

const userLoginFetch = createAsyncThunk(
    "auth/userLoginFetch",
    async ({ email, password, reCaptchaToken }, { rejectWithValue }) => {
        try {
            const response = await authApi.login(email, password, reCaptchaToken);
            console.log(response);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response);
        }
    }
);

const initialState = {
    currentUser: null,
    accessToken: null,
    isLoggingIn: false,
    isLoggedIn: false,
    errMsg: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLogout: (state) => {
            state = initialState;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLoginFetch.pending, (state) => {
                state.isLoggedIn = false;
                state.isLoggingIn = true;
                state.errMsg = "";
            })
            .addCase(userLoginFetch.fulfilled, (state, action) => {
                const { token, email } = action.payload;
                localStorage.setItem("token", token);
                state.currentUser = { email };
                state.isLoggedIn = true;
                state.isLoggingIn = false;
                state.errMsg = "";
            })
            .addCase(userLoginFetch.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.isLoggingIn = false;
                const message = action.payload?.data?.message;
                if (message) {
                    state.errMsg = message;
                } else {
                    state.errMsg = "Đăng nhập không thành công.";
                }
            });
    },
});

export { userLoginFetch };
export const { userLogout, setCurrentUser, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
