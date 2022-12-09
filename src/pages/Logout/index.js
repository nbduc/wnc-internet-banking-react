import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiSlice } from "../../app/apiSlice";
import { logout } from "../../features/Auth/authSlice";

function LogoutPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
        dispatch(apiSlice.util.resetApiState());
        navigate("/login", { replace: true });
    });

    return <div>...đang đăng xuất</div>;
}

export default LogoutPage;
