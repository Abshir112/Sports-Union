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
    const userRole = user ? user.user.role : null;

    const handleLogout = () => {
        logout();
    };



    return (
      <React.Fragment>

        <AppBar position="static" sx={{ backgroundColor: theme.palette.background.default}}>
          <Toolbar>
          <Logo />
                
            {isMatch ? (
              <>
                <DrawerComp />
              </>
            ) : (
              <>
                <Box
                // backgroundColor= "red"
                  sx={{ marginLeft: "auto",
                      display: "flex",
                      justifyContent: "space-between",
                      width: "50%",
                      marginRight: "3em",
                      alignItems: "center"
                      
                    }}
                >
                        <Link component={RouterLink} to="/" underline="hover" mr={1} sx={{ color: theme.palette.text.primary }}>
                            Home
                        </Link>
                        <Link component={RouterLink} to="/about" underline="hover" mr={1} sx={{ color: theme.palette.text.primary }}>
                            About
                        </Link>
                        <Link component={RouterLink} to="/activities" underline="hover" mr={1} sx={{ color: theme.palette.text.primary }}>
                            Activities
                        </Link>

                        
                        <Link component={RouterLink} to="/events" underline="hover" sx={{ color: theme.palette.text.primary }} >
                            Events
                        </Link>

                        {
                            userRole === "admin" ? (
                                <Link component={RouterLink} to="/admin" underline="hover" mr={1} sx={{ color: theme.palette.text.primary }}>
                                    Administration
                                </Link>
                            ) : null
                        }

                        {
                            user ? (
                                <>
                                    {/* <ButtonHandler title="Logout" link="/signIn" onClick={handleLogout} /> */}
                                    <Link sx={{ color: theme.palette.text.primary }} title="Logout"  link="/signIn" onClick={handleLogout} > Logout </Link>
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