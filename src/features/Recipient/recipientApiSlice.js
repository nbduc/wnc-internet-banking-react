import { apiSlice } from "../../app/apiSlice";
import { setRecipientList, setRecipientListStatus } from "./recipientSlice";
import { selectCustomerId } from "../Auth/authSlice";

export const recipientApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecipientsByCustomerId: builder.query({
            query: (customerId) => ({
                url: `api/beneficiaries?customerId=${customerId}`,
                method: "GET",
            }),
            providesTags: ["Recipient"],
            async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
                const currentCustomerId = selectCustomerId(getState());
                if (currentCustomerId === id) {
                    dispatch(setRecipientListStatus({ isLoading: true, isError: false }));
                    try {
                        const {data} = await queryFulfilled;
                        dispatch(setRecipientList(data));
                        dispatch(setRecipientListStatus({ isLoading: false }));
                    } catch (err) {
                        dispatch(setRecipientList([]));
                        dispatch(setRecipientListStatus({ isLoading: false, isError: true }));
                    }
                }
            }
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