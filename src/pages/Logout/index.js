import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../features/Auth/authSlice";

function LogoutPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userLogout());
        navigate("/login", { replace: true });
    });

    return <div>...đang đăng xuất</div>;
}

export default LogoutPage;
