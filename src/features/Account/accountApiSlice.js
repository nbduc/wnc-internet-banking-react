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
        directDeposit: builder.mutation({
            query: (params) => ({
                url: `api/accounts/direct-deposit`,
                method: "POST",
                body: {...params}
            }),
        }),
        getAccountsByEmail: builder.query({
            query: (email) => ({
                url: `api/accounts?email=${email}`,
                method: "GET"
            }),
            providesTags: (result) => [...result.map(({ accountNumber }) => ({ type: 'Accounts', id: accountNumber }))],
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data,
        }),
    })
})

export const {
    useGetAccountsByCustomerIdQuery,
    useCreateAccountMutation,
    useDirectDepositMutation,
    useGetAccountsByEmailQuery,
} = accountApiSlice;