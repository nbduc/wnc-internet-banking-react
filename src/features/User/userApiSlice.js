import { apiSlice } from "../../app/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        changePassword: builder.mutation({
            query: (params) => ({
                url: "api/users/change-password",
                method: "PUT",
                body: {...params}
            }),
        })
    })
})

export const { useChangePasswordMutation } = userApiSlice;