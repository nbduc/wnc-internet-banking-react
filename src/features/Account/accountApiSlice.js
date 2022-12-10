import { apiSlice } from "../../app/apiSlice";

export const accountApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAccountsByCustomerId: builder.query({
            query: (customerId) => ({
                url: `api/accounts?customerId=${customerId}`,
                method: "GET",
            }),
        })
    })
})

export const { useGetAccountsByCustomerIdQuery } = accountApiSlice;