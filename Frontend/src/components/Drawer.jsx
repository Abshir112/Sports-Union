import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";





const DrawerComp = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const {user} = useAuthContext();
  const userRole = user ? user.user.role : null;
  const [openDrawer, setOpenDrawer] = useState(false);

  const pages = [
    "Home",
    "About",
    "Activities",
    "Events",
    userRole === "admin" ? "Members" : null,
    user ? "Logout" : "Login",
  ];

  const handleItemClick = (page) => {
    console.log(`${page} clicked`);
    switch (page) {
      case "Home":
        navigate("/");
        break;
      case "About":
        navigate("/about");
        break;
      case "Activities": 
        navigate("/activities");
        break;
      case "Events":
        navigate("/events");
        break;
      case "Administration":
        navigate("/members");
        break;
      case "Logout":
        logout();
        break;
      case "Login":
        navigate("/signin");
        break;
      default:
        console.log("Invalid page");
    }
    setOpenDrawer(false); // Close the drawer after clicking an item
  };

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          {pages.map((page, index) => (
            <ListItemButton key={index} onClick={() => handleItemClick(page)}>
              <ListItemIcon>
                <ListItemText>{page}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
