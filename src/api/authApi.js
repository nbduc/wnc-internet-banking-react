import axiosClient from "./axiosClient";

const authApi = {
    login: async (email, password, reCaptchaToken) => {
        return axiosClient.post("/api/auths", { email, password, reCaptchaToken });
    },
};

export default authApi;
