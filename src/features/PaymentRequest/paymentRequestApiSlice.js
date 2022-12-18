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
        createPaymentRequest: builder.mutation({
            query: (params) => ({
                url: `api/debt-reminders`,
                method: "POST",
                body: params
            }),
            invalidatesTags: ["PaymentRequests"],
        }),
    }),
});

export const { useGetPaymentRequestByCustomerIdQuery, useCreatePaymentRequestMutation } = paymentRequestApiSlice;