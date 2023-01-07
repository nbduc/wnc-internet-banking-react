import { IconButton, Badge, Menu, MenuItem, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useSelector } from "react-redux";
import { selectNotificationList } from "../../features/Notification/notificationSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Notification = (props) => {
    const navigate = useNavigate();
    const notificationList = useSelector(selectNotificationList);
    const [anchorEl, setAnchorEl] = useState(null);
    const notificationListOpen = Boolean(anchorEl);
    const notificationListHandleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const notificationListHandleClose = () => {
        setAnchorEl(null);
    };
    return (<>
        <IconButton color="inherit" onClick={notificationListHandleClick}>
            <Badge badgeContent={notificationList?.length} color="secondary">
                <NotificationsIcon />
            </Badge>
        </IconButton>
        <Menu
            id="notifications-menu"
            anchorEl={anchorEl}
            open={notificationListOpen}
            onClose={notificationListHandleClose}
            MenuListProps={{
                "aria-labelledby": "notifications-button",
            }}
        >
            {notificationList?.length === 0 && <Typography sx={{padding: "10px"}} variant="body1">Không có thông báo.</Typography>}
            {notificationList?.map((item, idx) => 
                <MenuItem
                    key={idx}
                    onClick={(e) => {
                        notificationListHandleClose(e);
                        navigate("/payment-requests");
                    }}
                >
                    {item}
                </MenuItem>
            )}
        </Menu>
    </>)
}

export default Notification;