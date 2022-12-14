import { apiSlice } from "../../app/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        changePassword: builder.mutation({
            query: (params) => ({
                url: "api/users/change-password",
                method: "PUT",
                body: {...params}
            }),
        }),
        forgotPassword: builder.mutation({
            query: (email) => ({
                url: "api/users/forget-password",
                method: "POST",
                body: {email}
            }),
        }),
        resetPassword: builder.mutation({
            query: (params) => ({
                url: `api/users/reset-password`,
                method: "POST",
                body: params,
            }),
        }),
        createUser: builder.mutation({
            query: (params) => ({
                url: "api/users",
                method: "POST",
                body: {...params}
            }),
        }),
    })
})

export const {
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useCreateUserMutation,
} = userApiSlice;