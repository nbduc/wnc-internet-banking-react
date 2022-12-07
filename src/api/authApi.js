import axiosClient from "./axiosClient";
import paths from "./paths";

const authApi = {
    login: async (email, password, reCaptchaToken) => {
        return axiosClient.post(paths.auth.login, { email, password, reCaptchaToken });
    },
};

export default authApi;
