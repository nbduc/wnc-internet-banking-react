import * as React from "react";
import { List } from "@mui/material";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

function NavItems({ items, activePage }) {
    return (
        <List component="nav">
            {items.map((item, index) => {
                return (
                    <ListItemButton
                        component={Link}
                        to={item.link}
                        key={index}
                        selected={activePage === index}
                    >
                        <ListItemIcon>
                            <item.icon></item.icon>
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItemButton>
                );
            })}
        </List>
    );
}

NavItems.defaultProps = {
    items: [],
    activePage: -1,
};

export default NavItems;
