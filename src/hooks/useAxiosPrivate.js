import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { axiosPrivate } from "../api/axiosClient";
import { useSelector } from "react-redux";

function useAxiosPrivate() {
    const refresh = useRefreshToken();
    const accessToken = useSelector(state => state.auth.accessToken);
    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bear ${accessToken}`
                }
                return config;
            },
            error => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
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
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [refresh, accessToken]);

    return axiosPrivate;
}

export default useAxiosPrivate;