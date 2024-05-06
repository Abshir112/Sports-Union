import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#ffffff', 
        contrastText: '#000', 
        txtColor: '#eedbc4',
      },
      secondary: {
        main: '#f50057', 
      },
      background: {
        default: '#000', 
        paper: '#eedbc4',
      },
      text: {
        primary: '#eedbc4',
        secondary: 'rgba(255, 255, 255, 0.7)',
        
      },
    },
    typography: {
      fontFamily: '"Vollkorn SC", Arial, sans-serif', 
      h3: {
        fontWeight: 700, 
      },
      h5: {
        fontWeight: 500, 
      },
      body1: {
        fontWeight: 400, 
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 700, 
          },
        },
      },
    },
  });