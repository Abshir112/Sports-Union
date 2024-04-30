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
  
function Navbar() {
    const theme = useTheme();
    console.log(theme);
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    console.log(isMatch);
  
    return (
      <React.Fragment>

        <AppBar sx={{ background: "#000"
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
                  sx={{ marginLeft: "auto",
                      display: "flex",
                      justifyContent: "space-between",
                      width: "50%",
                      marginRight: "5em",
                      
                    }}
                >
                        <Link component={RouterLink} to="/" underline="hover">
                            Home
                        </Link>
                        <Link component={RouterLink} to="/about" underline="hover">
                            About
                        </Link>
                        <Link component={RouterLink} to="/contact" underline="hover">
                            Events
                        </Link>
                        <Link component={RouterLink} to="/Members" underline="hover">
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