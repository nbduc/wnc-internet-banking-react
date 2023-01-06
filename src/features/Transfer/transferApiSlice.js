import { apiSlice } from "../../app/apiSlice";

export const transferApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        executeInternalTransfer: builder.mutation({
            query: (params) => ({
                url: `api/transfers/internal`,
                method: "POST",
                body: params
            }),
            transformErrorResponse: (err) => err.data,
        }),
        executeExternalTransfer: builder.mutation({
            query: (params) => ({
                url: `api/transfers/external`,
                method: "POST",
                body: params
            }),
            transformErrorResponse: (err) => err.data,
        }),
        confirmOtp: builder.mutation({
            query: (params) => ({
                url: `api/transfers/otp-confirm`,
                method: "PUT",
                body: params,
            }),
            invalidatesTags: ["Accounts"],
        }),
    }),
});

export const {
    useExecuteInternalTransferMutation,
    useExecuteExternalTransferMutation,
    useConfirmOtpMutation,
} = transferApiSlice;