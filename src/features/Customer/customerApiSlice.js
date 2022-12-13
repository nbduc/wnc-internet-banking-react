import { apiSlice } from "../../app/apiSlice";

export const customerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCustomer: builder.mutation({
            query: (params) => ({
                url: `api/customers`,
                method: "POST",
                body: {...params}
            }),
        }),
    })
})

export const {
    useCreateCustomerMutation,
} = customerApiSlice;