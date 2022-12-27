import { apiSlice } from "../../app/apiSlice";

export const employeeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllEmployees: builder.query({
            query: () => ({
                url: `api/staffs?PageNumber=1&PageSize=10`,
                method: "GET",
            }),
            providesTags: ["Employees"],
            transformResponse: (response) => {
                return response.data.sort((a, b) => {
                    return new Date(b.createdDate) - new Date(a.createdDate);
                })
            },
        }),
        createEmployee: builder.mutation({
            query: (params) => ({
                url: `api/staffs`,
                method: "POST",
                body: params
            }),
            invalidatesTags: ["Employees"],
        }),
        editEmployee: builder.mutation({
            query: (params) => ({
                url: `api/staffs`,
                method: "PUT",
                body: params,
            }),
            invalidatesTags: ["Employees"],
        }),
        deleteEmployee: builder.mutation({
            query: (params) => ({
                url: `api/staffs`,
                method: "DELETE",
                body: params,
            }),
            invalidatesTags: ["Employees"],
        }),
    })
})

export const {
    useGetAllEmployeesQuery,
    useCreateEmployeeMutation,
    useEditEmployeeMutation,
    useDeleteEmployeeMutation,
} = employeeApiSlice;