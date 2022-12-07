import axios from "axios";
import queryString from "query-string";

// axios public
export default axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: {
        encode: (params) => {
            queryString.stringify(params);
        },
    },
});

// axios private
export const axiosPrivate = axios.create({
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