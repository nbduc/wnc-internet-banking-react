import axios from "axios";
import queryString from "query-string";

// axios public
const axiosClient = axios.create({
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

axiosClient.interceptors.request.use(
    config => config,
    error => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    response => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    error => Promise.reject(error)
);

export default axiosClient;

