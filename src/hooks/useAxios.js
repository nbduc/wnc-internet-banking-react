import { useEffect } from "react";
import axiosClient from "../api/axiosClient";

function useAxios() {
    useEffect(() => {
        const requestIntercept = axiosClient.interceptors.request.use(
            config => config,
            error => Promise.reject(error)
        )

        const responseIntercept = axiosClient.interceptors.response.use(
            response => {
                if (response && response.data) {
                    return response.data;
                }
                return response;
            },
            error => Promise.reject(error)
        )

        return () => {
            axiosClient.interceptors.request.eject(requestIntercept);
            axiosClient.interceptors.response.eject(responseIntercept);
        }
    }, []);

    return axiosClient;
}

export default useAxios;