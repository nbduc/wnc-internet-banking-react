import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setAccessToken, logout } from "../features/Auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;
        if (token) {
            headers.set('Authorization', `Bear ${token}`);
        }

        return headers;
    }
});

const basequeryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.originalStatus === 403) {
        const refreshResult = await baseQuery('api/auth/refresh-token', api, extraOptions);
        if (refreshResult?.data) {
            api.dispatch(setAccessToken(refreshResult.data));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }
    
    return result;
}

export const apiSlice = createApi({
    baseQuery: basequeryWithReauth,
    endpoints: builder => ({})
});