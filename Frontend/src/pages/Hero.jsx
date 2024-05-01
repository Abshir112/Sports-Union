import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { ButtonHandler } from '../components/Button.jsx'; 

export const Hero = () => {
  return (
    <Box sx={{
      backgroundColor: '#000', 
      padding: 8, 
      textAlign: 'center', 
      color: '#fff', 
      marginTop: 12,
  
    }}>
      <Typography variant="h3" component="h1" sx={{
        fontFamily: '"Vollkorn SC", Arial, sans-serif',
        fontWeight: 'bold', 
        mb: 4, 
        letterSpacing: 1,
      }}>
        ELEVATE YOUR SPORTS PASSION
      </Typography>
      <Typography variant="h5" sx={{
        fontFamily: '"Vollkorn SC", Arial, sans-serif',
        fontWeight: 'normal', 
        mb: 3, 
        letterSpacing: 2, 
        color: 'rgba(255, 255, 255, 0.7)', 
      }}>
        BEYOND BOUNDARIES
      </Typography>
      <Typography variant="body1" sx={{
        fontFamily: '"Vollkorn SC", Arial, sans-serif',
        fontWeight: 'light',
        mb: 6, 
      }}>
        "Compete with the best, train with the best, and become the best. At our sports union, you'll not only master your sport but also meet peers from around the globe. Discover new cultures, forge lasting friendships, and achieve greatness. Join us and make memories that will last a lifetime — this is where champions are made and horizons are expanded!"
      </Typography>
      <ButtonHandler title="Sign Up" link="/signUp"  py="0.5" />
    </Box>
  );
};
