import React, { useState } from "react";
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
  
function Navbar() {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  
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
                        <Link component={RouterLink} to="/" underline="hover" mr={1}>
                            Home
                        </Link>
                        <Link component={RouterLink} to="/about" underline="hover" mr={1}>
                            About
                        </Link>
                        <Link component={RouterLink} to="/contact" underline="hover" mr={1}>
                            Events
                        </Link>
                        <Link component={RouterLink} to="/Members" underline="hover" mr={1}>
                            Members
                        </Link>
                        <Link component={RouterLink} to="/Stories" underline="hover">
                            Stories
                        </Link>
                </Box>
              </>
            )}
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  };
export default Navbar;