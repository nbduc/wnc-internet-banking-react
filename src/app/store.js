import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "../features/Page/pageSlice";

const store = configureStore({
    reducer: {
        pageList: pageReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
