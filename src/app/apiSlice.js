import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setAccessToken, logout } from "../features/Auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;
        headers.set("Access-Control-Allow-Credentials", "true");
        headers.set("XApiKey", "day la api key");
        if (token) {
            headers.set('Authorization', `Bear ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    //access token expired
    if (result?.error?.status === 401) {
        const refreshResult = await baseQuery({ url: 'api/auths/refresh-token', method: 'POST' }, api, extraOptions);
        if (refreshResult?.data) {
            api.dispatch(setAccessToken(refreshResult.data.token));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }
    
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Recipients', 'Accounts', 'PaymentRequests', 'Debts'],
    endpoints: builder => ({})
});