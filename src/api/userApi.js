import axiosPrivate from "./axiosPrivate";

const userApi = {
    changePassword: async ( oldPassword, newPassword, confirmPassword ) => {
        return axiosPrivate.post("/api/users/change-password", { oldPassword, newPassword, confirmPassword });
    },
};

export default userApi;