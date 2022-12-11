import { apiSlice } from "../../app/apiSlice";

export const recipientApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecipientsByCustomerId: builder.query({
            query: (customerId) => ({
                url: `api/beneficiaries?customerId=${customerId}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetRecipientsByCustomerIdQuery } = recipientApiSlice;