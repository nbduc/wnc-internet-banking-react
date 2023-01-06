import { apiSlice } from "../../app/apiSlice";

export const paymentRequestApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPaymentRequestByCustomerId: builder.query({
            query: (customerId) => ({
                url: `api/debt-reminders/${customerId}`,
                method: "GET",
            }),
            providesTags: ["PaymentRequests"],
            transformResponse: (response) => {
                return response.sort((a, b) => {
                    return new Date(b.createdDate) - new Date(a.createdDate);
                })
            },
        }),
        createPaymentRequest: builder.mutation({
            query: (params) => ({
                url: `api/debt-reminders`,
                method: "POST",
                body: params
            }),
            invalidatesTags: ["PaymentRequests"],
        }),
        deletePaymentRequest: builder.mutation({
            query: (params) => ({
                url: `api/debt-reminders`,
                method: "DELETE",
                body: params
            }),
            invalidatesTags: ["PaymentRequests"],
        }),
        getDebtList: builder.query({
            query: () => ({
                url: `api/debt-reminders/my-debts`,
                method: "GET"
            }),
            providesTags: ["Debts"],
            transformResponse: (response) => {
                return response.sort((a, b) => {
                    return new Date(b.createdDate) - new Date(a.createdDate);
                })
            },
        }),
        payDebt: builder.mutation({
            query: (id) => ({
                url: `api/transfers/debt-payment?debtReminderId=${id}`,
                method: "POST",
            }),
            invalidatesTags: ["Accounts", "Debts"],
        }),
    }),
});

export const {
    useGetPaymentRequestByCustomerIdQuery,
    useCreatePaymentRequestMutation,
    useDeletePaymentRequestMutation,
    useGetDebtListQuery,
    usePayDebtMutation,
    useUpdatePaymentRequestMutation,
} = paymentRequestApiSlice;