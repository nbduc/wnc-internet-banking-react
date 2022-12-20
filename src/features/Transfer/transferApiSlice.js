import { apiSlice } from "../../app/apiSlice";

export const transferApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        executeInternalTransfer: builder.mutation({
            query: (params) => ({
                url: `api/transfer/internal`,
                method: "POST",
                body: params
            }),
        }),
    }),
});

export const {
    useExecuteInternalTransferMutation,
} = transferApiSlice;