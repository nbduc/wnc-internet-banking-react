import { IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import { useState } from "react";
import { userListItems } from "../../common";
import { useNavigate } from "react-router-dom";

function UserActions() {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.currentUser);

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
                <MenuItem divider>{currentUser?.email}</MenuItem>
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
