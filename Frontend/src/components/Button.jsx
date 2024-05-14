import React from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material';

export const ButtonHandler = (props) => {
  const theme = useTheme();
  return (
    <Button component={RouterLink} to={props.link} variant="contained" onClick={props.onClick} sx={{
      backgroundColor: theme.button[props.color],
      mr: 2, 
      mb: 2,
      color: theme.palette.text.primary, 
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

