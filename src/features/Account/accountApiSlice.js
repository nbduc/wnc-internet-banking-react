import { apiSlice } from "../../app/apiSlice";
import { selectCustomerId } from "../Auth/authSlice";
import { setAccountList, setAccountListStatus } from "./accountSlice";

export const accountApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAccountsByCustomerId: builder.query({
            query: (customerId) => ({
                url: `api/accounts?customerId=${customerId}`,
                method: "GET",
            }),
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.data,
            async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
                const currentCustomerId = selectCustomerId(getState());
                if (currentCustomerId === id) {
                    dispatch(setAccountListStatus({ isLoading: true, isError: false }));
                    try {
                        const {data} = await queryFulfilled;
                        dispatch(setAccountList(data));
                        dispatch(setAccountListStatus({ isLoading: false }));
                    } catch (err) {
                        dispatch(setAccountList([]));
                        dispatch(setAccountListStatus({ isLoading: false, isError: true }));
                    }
                }
            }
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
        getTransactionHistoryByAccountNumber: builder.query({
            query: (accountNumber) => ({
                url: `api/accounts/account-number/${accountNumber}/transaction-history`,
                method: "GET"
            }),
            transformResponse: (response) => {
                return response.data.sort((a, b) => {
                    return new Date(b.transactionDate) - new Date(a.transactionDate);
                })
            },
        }),
        getAccountByAccountNumber: builder.query({
            query: (accountNumber) => ({
                url: `api/accounts/account-number/${accountNumber}`,
                method: "GET",
            }),
        }),
    })
})

export const {
    useGetAccountsByCustomerIdQuery,
    useCreateAccountMutation,
    useDirectDepositMutation,
    useGetAccountsByEmailQuery,
    useGetTransactionHistoryByAccountNumberQuery,
    useGetAccountByAccountNumberQuery,
    useGetMyAccountsQuery,
} = accountApiSlice;