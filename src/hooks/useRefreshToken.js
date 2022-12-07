import axiosClient from "../api/axiosClient";
import paths from "../api/paths";
import { setAccessToken } from "../features/Auth/authSlice";

function useRefreshToken() {
    const refresh = async () => {
        const response = axiosClient.get(paths.auth.refreshToken, {
            withCredentials: true,
        });
        setAccessToken(response?.token);
        return (response?.token);
    }
    return refresh;
}

export default useRefreshToken;