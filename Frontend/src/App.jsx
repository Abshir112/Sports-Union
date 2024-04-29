import React from 'react';
import {Hero} from './components/landingPage/Hero';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff', 
      contrastText: '#000', 
    },
    secondary: {
      main: '#f50057', 
    },
    background: {
      default: '#121212', 
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif', 
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Hero />
    </ThemeProvider>
  );
}

export default App;
