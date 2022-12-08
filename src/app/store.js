import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "../features/Page/pageSlice";
import authReducer from "../features/Auth/authSlice";
import { apiSlice } from "../api/apiSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        pageList: pageReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(apiSlice.middleware)
    ,
    devTools: true
});

export default store;
