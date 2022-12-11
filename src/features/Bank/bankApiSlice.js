import { apiSlice } from "../../app/apiSlice";

export const bankApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllBanks: builder.query({
            query: () => ({
                url: "api/banks",
                method: "GET",
            }),
        })
    })
})

export const { useGetAllBanksQuery } = bankApiSlice;