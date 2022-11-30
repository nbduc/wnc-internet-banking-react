import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "../features/Page/pageSlice";
import authReducer from "../features/Auth/authSlice";

const store = configureStore({
    reducer: {
        pageList: pageReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
