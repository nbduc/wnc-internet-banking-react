import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "../features/Page/pageSlice";
import authReducer from "../features/Auth/authSlice";
import userReducer from "../features/User/userSlice";
import paymentRequestReducer from "../features/PaymentRequest/paymentRequestSlice";
import { apiSlice } from "./apiSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        pageList: pageReducer,
        auth: authReducer,
        user: userReducer,
        paymentRequest: paymentRequestReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(apiSlice.middleware)
    ,
    devTools: true
});

export default store;
