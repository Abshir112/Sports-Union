import React from "react";
import { Container, Typography, Box, Link } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";



const Footer = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    return (<>
        <hr />
        <Container maxWidth="lg" component="footer" style={{display: "flex", justifyContent: "space-between"}} sx={{marginBottom: 2}}>
            <Box>
                <Typography gutterBottom variant="h6" fontSize={isSmallScreen ? "medium" : "large"} align="center" > Contact Us </Typography>
                <Box>
                    <Link href="https://www.instagram.com/hkif_skane/" target="_blank" rel="noopener noreferrer">
                        <InstagramIcon fontSize={isSmallScreen ? "small" : "large"} sx={{ mr: isSmallScreen ? 3 : 5 }} />
                    </Link>

                    <Link href="https://www.facebook.com/HKIFatHKR" target="_blank" rel="noopener noreferrer">
                        <FacebookIcon fontSize={isSmallScreen ? "small" : "large"} sx={{ mr: isSmallScreen ? 3 : 5 }}/>
                    </Link>
                       
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                        <LinkedinIcon fontSize={isSmallScreen ? "small" : "large"} ></LinkedinIcon>
                    </Link>
                </Box>

            </Box>
            <Box>
                <Typography gutterBottom variant="h6" fontSize={isSmallScreen ? "medium" : "large"} align="center">Contact Information</Typography>
                <Typography variant="body1" fontSize="small" align="center" >Place: Ground Floor In <br /> Building 15 At HÖGSKOLAN <br /> KRISTIANSTAD </Typography>

            </Box>
            <Box>
                <Typography gutterBottom variant="h6" fontSize={isSmallScreen ? "medium" : "large"} align="center">Office Hours</Typography>
                <Typography variant="body1" fontSize="small"  align="center" > Mon to Fri: 09:00 - 03:00 <br /> Sat and Sun: Holiday </Typography>
            </Box>
        </Container>
        </>
    );
    
}

export default Footer;
