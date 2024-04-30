import React from 'react';
import { Button } from '@mui/material';

export const SignUpBtn = () => {
  return (
    <Button variant="contained" sx={{
      backgroundColor: 'primary.main', 
      color: 'primary.contrastText', 
      textTransform: 'uppercase', 
      fontFamily: '"Vollkorn SC", Arial, sans-serif',
      fontWeight: 'bold', 
      fontSize: '1rem', 
      letterSpacing: 1, 
      px: 5, 
      py: 1.5, 
      borderRadius: '4px', 
      '&:hover': {
        backgroundColor: 'primary.dark', 
      },
    }}>
      Sign Up
    </Button>
  );
};

