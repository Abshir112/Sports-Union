import React from "react";
import { Container, Typography, Box } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import Divider from '@mui/material/Divider';

const Footer = () => {
    return (
        <Container component="footer" style={{display: "flex", justifyContent: "space-between"}}>
            <Box>
                <Typography variant="h6" > Contact Us </Typography>
                <InstagramIcon></InstagramIcon>
                <FacebookIcon></FacebookIcon>
                <LinkedinIcon></LinkedinIcon>
            </Box>
            <Box>
                <Typography variant="h6">Contact Information</Typography>

            </Box>
            <Box>
                <Typography variant="h6">Office Hours</Typography>
            </Box>
        </Container>
    );
}

export default Footer;
