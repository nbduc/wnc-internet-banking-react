import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/Auth/authSlice";

function LogoutPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
        navigate("/login", { replace: true });
    });

    return <div>...đang đăng xuất</div>;
}

export default LogoutPage;
