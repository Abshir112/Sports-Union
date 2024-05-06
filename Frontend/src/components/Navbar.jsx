import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
    Box,
} from "@mui/material";
import Link from "@mui/material/Link";
import DrawerComp from "./Drawer";
import Logo from "./Logo";
import { ButtonHandler } from "./Button";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
  
function Navbar() {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const { logout } = useLogout();
    const {user} = useAuthContext();

    const handleLogout = () => {
        logout();
    };

    return (
      <React.Fragment>

        <AppBar position="static" sx={{ backgroundColor: "background.default"
    }}>
          <Toolbar>
          <Logo />
                
            {isMatch ? (
              <>
                <DrawerComp />
              </>
            ) : (
              <>
                <Box
                color='#000'
                // backgroundColor= "red"
                  sx={{ marginLeft: "auto",
                      display: "flex",
                      justifyContent: "space-between",
                      width: "50%",
                      marginRight: "3em",
                      alignItems: "center"
                      
                    }}
                >
                        <Link component={RouterLink} to={user ? "/events" : "/"} underline="hover" mr={1}>
                            Home
                        </Link>
                        <Link component={RouterLink} to="/about" underline="hover" mr={1}>
                            About
                        </Link>
                        <Link component={RouterLink} to="/activities" underline="hover" mr={1}>
                            Activities
                        </Link>
                        <Link component={RouterLink} to="/members" underline="hover" mr={1}>
                            Members
                        </Link>
                        <Link component={RouterLink} to="/events" underline="hover">
                            Events
                        </Link>

                        {
                            user ? (
                                <>
                                    <ButtonHandler title="Logout" link="/signIn" onClick={handleLogout} />
                                </>
                            ) : (
                              null
                            )
                        }
                </Box>
              </>
            )}
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
export default Navbar;