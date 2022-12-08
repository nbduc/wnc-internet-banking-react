import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "api/auths",
                method: "POST",
                body: {...credentials}
            }),
        })
    })
})

export const { useLoginMutation } = authApiSlice;