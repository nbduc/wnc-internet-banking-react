import { createSlice } from "@reduxjs/toolkit";
import { paymentRequestApiSlice } from "./paymentRequestApiSlice";

const initialState = {
    list: [],
    loading: false,
};

const paymentRequestSlice = createSlice({
    name: 'paymentRequest',
    initialState,
    extraReducers: (builder) => {
        builder
            .addMatcher(paymentRequestApiSlice.endpoints.getPaymentRequestByCustomerId.matchPending, (state, action) => {
                state.loading = true;
            })
            .addMatcher(paymentRequestApiSlice.endpoints.getPaymentRequestByCustomerId.matchFulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
    }
});

export const selectPaymentRequestList = (state) => state.paymentRequest.list;
export default paymentRequestSlice.reducer;