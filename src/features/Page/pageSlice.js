import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activePage: null,
    items: [],
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
    },
});

export const { setActivePage, setPageList } = pageSlice.actions;
export default pageSlice.reducer;
