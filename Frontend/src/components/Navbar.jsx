import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
    Box,
} from "@mui/material";
import { Link } from "react-router-dom";
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
                  indicatorColor="primary"
                  textColor="inherit"
                >
                        <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
                            Home
                        </Link>
                        <Link to="/about" style={{ textDecoration: 'none', color: '#fff' }}>
                            About
                        </Link>
                        <Link to="/contact" style={{ textDecoration: 'none', color: '#fff' }}>
                            Events
                        </Link>
                        <Link to="/Members" style={{ textDecoration: 'none', color: '#fff' }}>
                            Members
                        </Link>
                        <Link to="/Stories" style={{ textDecoration: 'none', color: '#fff'}}>
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