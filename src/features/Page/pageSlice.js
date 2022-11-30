import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activePage: null,
    items: [],
    userItems: [],
};

const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        setActivePage: (state, action) => {
            state.activePage = action.payload;
        },
        setPageList: (state, action) => {
            state.items = action.payload;
        },
        setUserPageList: (state, action) => {
            state.userItems = action.payload;
        },
    },
});

export const { setActivePage, setPageList, setUserPageList } =
    pageSlice.actions;
export default pageSlice.reducer;
