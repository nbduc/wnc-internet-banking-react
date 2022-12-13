import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useState } from "react";
import { userListItems } from "../../common";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser, selectRole } from "../../features/Auth/authSlice";

function UserActions() {
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const currentRole = useSelector(selectRole);

    const [anchorEl, setAnchorEl] = useState(null);
    const actionListOpen = Boolean(anchorEl);
    const actionListHandleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const actionListHandleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton color="inherit" onClick={actionListHandleClick}>
                <PersonIcon />
            </IconButton>

            <Menu
                id="user-actions-menu"
                anchorEl={anchorEl}
                open={actionListOpen}
                onClose={actionListHandleClose}
                MenuListProps={{
                    "aria-labelledby": "user-actions-button",
                }}
            >
                <MenuItem divider>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography
                            component="div"
                            variant="h6"
                            color="text.primary"
                        >
                            {currentUser?.firstName}
                            {" "}
                            {currentUser?.lastName}
                        </Typography>
                        <Typography
                            component="div"
                            variant="body1"
                            color="text.secondary"
                        >
                            {currentUser?.email}
                        </Typography>
                        <Typography
                            component="div"
                            variant="body2"
                            color="text.secondary"
                        >
                            {currentRole}
                        </Typography>
                    </Box>
                </MenuItem>
                {userListItems.map((item, idx) => {
                    return (
                        <MenuItem
                            key={idx}
                            onClick={(e) => {
                                actionListHandleClose(e);
                                navigate(item.link);
                            }}
                        >
                            {item.title}
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
}

export default UserActions;
