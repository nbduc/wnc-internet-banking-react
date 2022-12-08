import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RequireAuth({allowedRoles}) {
    const location = useLocation();
    const currentUser = useSelector(state => state.auth.currentUser);
    return (

        allowedRoles?.includes(currentUser?.role)
            ? <Outlet />
            : currentUser?.email && !allowedRoles
                ? <Outlet /> 
                : currentUser?.email
                    ? <Navigate to="/unauthorized" state={{from: location}} replace />
                    : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;