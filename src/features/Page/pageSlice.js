import { createSlice } from "@reduxjs/toolkit";
import { ROLES } from "../../common";
import {
    customerListItems,
    adminListItems,
    employeeListItems,
} from "../../common";

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
    extraReducers: builder => {
        builder.addCase('auth/userLoginFetch/fulfilled', (state, action) => {
            const { role } = action.payload;
            switch (role) {
                case ROLES.customer:
                    state.items = customerListItems;
                    break;
                case ROLES.employee:
                    state.items = employeeListItems;
                    break;
                case ROLES.admin:
                    state.items = adminListItems;
                    break;
                default:
                    state.items = customerListItems;
            }
        })
    }
});

export const { setActivePage, setPageList, setUserPageList } =
    pageSlice.actions;
export default pageSlice.reducer;
