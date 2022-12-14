import { apiSlice } from "../../app/apiSlice";

export const paymentRequestApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPaymentRequestByCustomerId: builder.query({
            query: (customerId) => ({
                url: `api/debt-reminders/${customerId}`,
                method: "GET",
            }),
            providesTags: ["PaymentRequests"],
        }),
    }),
});

export const { useGetPaymentRequestByCustomerIdQuery } = paymentRequestApiSlice;