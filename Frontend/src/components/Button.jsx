import React from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const ButtonHandler = (props) => {
  return (
    <Button component={RouterLink} to={props.link} variant="contained" sx={{
      backgroundColor: 'primary.main', 
      color: 'primary.contrastText', 
      textTransform: 'uppercase', 
      fontFamily: '"Vollkorn SC", Arial, sans-serif',
      fontWeight: 'bold', 
      fontSize: '1rem', 
      letterSpacing: 1, 
      px: 5, 
      py: props.py || 2, 
      borderRadius: '4px', 
      '&:hover': {
        backgroundColor: 'primary.dark', 
      },
    }}>
      {props.title}
    </Button>
  );
};

