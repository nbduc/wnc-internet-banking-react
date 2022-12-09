import { apiSlice } from "../../app/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "api/auths",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        refresh: builder.mutation({
            query: () => ({
                url: "api/auths/refresh-token",
                method: "POST"
            })
        })
    })
})

export const { useLoginMutation, useRefreshMutation } = authApiSlice;