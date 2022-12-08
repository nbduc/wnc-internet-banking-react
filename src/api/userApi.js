import axiosPrivate from "./axiosPrivate";

const userApi = {
    changePassword: async (email, oldPassword, newPassword) => {
        return axiosPrivate.post("/api/users/change-password", { email, oldPassword, newPassword });
    },
};

export default userApi;