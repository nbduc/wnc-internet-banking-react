import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotificationList: (state, action) => {
            state.list = action.payload;
        },
        addNotification: (state, action) => {
            state.list.push(action.payload);
        },
    }
});

export const selectNotificationList = (state) => state.notification.list;
export const { setNotificationList, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;