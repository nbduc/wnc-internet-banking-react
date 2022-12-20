import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    status: {
        isLoading: false,
        isError: false,
    }
};

const recipientSlice = createSlice({
    name: "recipient",
    initialState,
    reducers: {
        setRecipientList: (state, action) => {
            state.list = action.payload;
        },
        setRecipientListStatus: (state, action) => {
            state.status = {
                ...state.status,
                ...action.payload
            };
        }
    }
});

export const selectRecipientList = (state) => state.recipient.list;
export const selectRecipientListStatus = (state) => state.recipient.status;
export const { setRecipientList, setRecipientListStatus } = recipientSlice.actions;
export default recipientSlice.reducer;