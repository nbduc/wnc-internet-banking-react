import { apiSlice } from "../../app/apiSlice";

export const recipientApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecipientsByCustomerId: builder.query({
            query: (customerId) => ({
                url: `api/beneficiaries?customerId=${customerId}`,
                method: "GET",
            }),
            providesTags: ["Recipient"]
        }),
        addRecipient: builder.mutation({
            query: (body) => ({
                url: `api/beneficiaries/`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ["Recipient"],
        }),
        updateRecipient: builder.mutation({
            query: ({id, ...patch}) => ({
                url: `api/beneficiaries/${id}`,
                method: "PATCH",
                body: patch
            }),
            invalidatesTags: ["Recipient"],
        }),
        deleteRecipient: builder.mutation({
            query: (id) => ({
                url: `api/beneficiaries/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Recipient"],
        })
    }),
});

export const {
    useGetRecipientsByCustomerIdQuery,
    useAddRecipientMutation,
    useUpdateRecipientMutation,
    useDeleteRecipientMutation,
} = recipientApiSlice;