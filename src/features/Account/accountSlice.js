import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    status: {
        isLoading: false,
        isError: false,
    }
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setAccountList: (state, action) => {
            state.list = action.payload;
        },
        setAccountListStatus: (state, action) => {
            state.status = {
                ...state.status,
                ...action.payload
            };
        }
    }
});

export const selectAccountList = (state) => state.account.list;
export const selectAccountListStatus = (state) => state.account.status;
export const { setAccountList, setAccountListStatus } = accountSlice.actions;
export default accountSlice.reducer;