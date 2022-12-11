import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { useRefreshMutation } from "../../features/Auth/authApiSlice";
import LinearIndeterminate from "../LinearIndeterminate";

const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(state => state.auth.accessToken);
    const [trueSuccess, setTrueSuccess] = useState(false);
    const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] = useRefreshMutation();


    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
                setTrueSuccess(true);
            } catch (err) {
                console.log(err);
            }
        }
        if (!token && persist) {
            verifyRefreshToken()
        }

        // eslint-disable-next-line
    }, []);

    let content
    if (!persist) { // persist: no
        content = <Outlet />
    } else if (isLoading) { //persist: yes, token: no
        content = <LinearIndeterminate/>
    } else if (isError) { //persist: yes, token: no
        content = (
            <p>
                {error.data?.message}
                <Link to="/login">Please login again</Link>.
            </p>
        )
    } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        content = <Outlet />
    } else if (token && isUninitialized) { //persist: yes, token: yes
        content = <Outlet />
    }

    return content
}

export default PersistLogin