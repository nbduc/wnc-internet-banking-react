import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAccessToken, selectRole } from '../../features/Auth/authSlice';

function RequireAuth({allowedRoles}) {
    const location = useLocation();
    const currentRole = useSelector(selectRole);
    const accessToken = useSelector(selectAccessToken);
    return (
        allowedRoles?.includes(currentRole)
            ? <Outlet />
            : accessToken && !allowedRoles
                ? <Outlet /> 
                : accessToken
                    ? <Navigate to="/unauthorized" state={{from: location}} replace />
                    : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;