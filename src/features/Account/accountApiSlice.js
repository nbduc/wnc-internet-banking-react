import { apiSlice } from "../../app/apiSlice";

export const accountApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAccountsByCustomerId: builder.query({
            query: (customerId) => ({
                url: `api/accounts?customerId=${customerId}`,
                method: "GET",
            }),
        }),
        createAccount: builder.mutation({
            query: (params) => ({
                url: `api/accounts`,
                method: "POST",
                body: {...params}
            }),
        }),
    })
})

export const {
    useGetAccountsByCustomerIdQuery,
    useCreateAccountMutation,
} = accountApiSlice;