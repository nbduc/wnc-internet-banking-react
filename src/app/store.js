import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "../features/Page/pageSlice";
import authReducer from "../features/Auth/authSlice";
import userReducer from "../features/User/userSlice";
import paymentRequestReducer from "../features/PaymentRequest/paymentRequestSlice";
import accountReducer from "../features/Account/accountSlice";
import recipientReducer from "../features/Recipient/recipientSlice";
import bankReducer from "../features/Bank/bankSlice";
import notificationReducer from "../features/Notification/notificationSlice";
import { apiSlice } from "./apiSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        pageList: pageReducer,
        auth: authReducer,
        user: userReducer,
        paymentRequest: paymentRequestReducer,
        account: accountReducer,
        recipient: recipientReducer,
        bank: bankReducer,
        notification: notificationReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(apiSlice.middleware)
    ,
    devTools: true
});

export default store;
