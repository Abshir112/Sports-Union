import React from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const ButtonHandler = (props) => {
  return (
    <Button component={RouterLink} to={props.link} variant="contained" onClick={props.onClick} sx={{
      backgroundColor: 'background.default',
      mr: 2, 
      color: 'primary.main', 
      textTransform: 'uppercase', 
      fontFamily: '"Vollkorn SC", Arial, sans-serif',
      fontWeight: 'bold', 
      fontSize: '1rem', 
      letterSpacing: 1, 
      px: props.px || 4, 
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

