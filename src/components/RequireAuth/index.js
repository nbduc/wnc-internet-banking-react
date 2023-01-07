import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAccessToken, selectRole } from '../../features/Auth/authSlice';
import { selectCustomerId } from '../../features/Auth/authSlice';
import { useDispatch } from 'react-redux';
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { addNotification } from "../../features/Notification/notificationSlice";
import { useState, useEffect } from 'react';

const Notify = () => {
    const dispatch = useDispatch();
    const customerId = useSelector(selectCustomerId);
    const [msg, setMsg] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    }
    const [connection, setConnection] = useState(null);
    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(`${process.env.REACT_APP_BASE_URL}/notihub`)
            .withAutomaticReconnect()
            .build();
    
        setConnection(connect);
    }, []);

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    console.log(customerId);
                    connection.on("DeleteDebt", (response) => {
                        const { notifyTo, message } = response;
                        if (customerId == notifyTo) {
                            setMsg(message);
                            setSnackbarOpen(true);
                            dispatch(addNotification(message));
                        }
                    });
                    connection.on("CreateDebt", (response) => {
                        const { notifyTo, message } = response;
                        if (customerId == notifyTo) {
                            setMsg(message);
                            setSnackbarOpen(true);
                            dispatch(addNotification(message));
                        }
                    });
                })
                .catch((error) => console.log(error));
        }
    }, [connection, dispatch, customerId]);
    return (
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={msg}
            action={
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleSnackbarClose}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        ></Snackbar>
    )
}

function RequireAuth({allowedRoles}) {
    const location = useLocation();
    const currentRole = useSelector(selectRole);
    const accessToken = useSelector(selectAccessToken);
    return (
        allowedRoles?.includes(currentRole)
            ? <><Notify/><Outlet /></>
            : accessToken && !allowedRoles
                ? <><Notify/><Outlet /></>
                : accessToken
                    ? <Navigate to="/unauthorized" state={{from: location}} replace />
                    : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;