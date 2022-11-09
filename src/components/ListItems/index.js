import * as React from "react";
import { List } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

function ListItems(props) {
    const customerListItems = useSelector((state) => state.pageList.items);
    const activePage = useSelector((state) => state.pageList.activePage);
    return (
        <List component="nav">
            {customerListItems.map((item, index) => {
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

export default ListItems;
