import axios from "axios";
import axiosClient from "./axiosClient";
import queryString from "query-string";
import { useSelector } from "react-redux";
import { setAccessToken } from "../features/Auth/authSlice";

const refresh = async () => {
    const response = axiosClient.get("api/auths/refresh-token", {
        withCredentials: true,
    });
    setAccessToken(response?.token);
    return (response?.token);
}

// axios private
const axiosPrivate = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    paramsSerializer: {
        encode: (params) => {
            queryString.stringify(params);
        },
    },
});

// axiosPrivate.interceptors.request.use(
//     config => {
//         if (!config.headers['Authorization']) {
//             config.headers['Authorization'] = `Bear ${accessToken}`
//         }
//         return config;
//     },
//     error => Promise.reject(error)
// );

axiosPrivate.interceptors.response.use(
    response => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    async error => {
        const prevRequest = error?.config;
        if (error?.response.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const newAccessToken = await refresh();
            prevRequest.headers['Authorization'] = `Bear ${newAccessToken}`;
            return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
    }
);

export default axiosPrivate;