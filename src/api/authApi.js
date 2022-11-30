import axiosClient from "./axiosClient";
import paths from "./paths";

const authApi = {
    login: async (username, password) => {
        // return axiosClient.post(paths.login, { username, password });
        return Promise.resolve({
            jwt: "abc",
            user: { role: "customer", name: "Tên người dùng" },
        });
        // const sleep = (m) => new Promise((r) => setTimeout(r, m));
        // await sleep(3000);
        // return Promise.reject({
        //     message: "Đăng nhập không thành công. Vui lòng thử lại.",
        // });
    },
};

export default authApi;
