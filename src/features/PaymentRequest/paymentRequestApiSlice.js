import { apiSlice } from "../../app/apiSlice";

export const paymentRequestApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPaymentRequestById: builder.query({
            query: (id) => ({
                url: `api/debt-reminders?id=${id}`,
                method: "GET",
            }),
        })
    })
})

export const { useGetPaymentRequestByIdQuery } = paymentRequestApiSlice;