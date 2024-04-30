import React from 'react';
import {Hero} from './pages/Hero';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ffffff', 
      contrastText: '#000', 
    },
    secondary: {
      main: '#f50057', 
    },
    background: {
      default: '#000', 
      paper: '#fff',
    },
    text: {
      primary: '#ffffff',
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about"  />
          <Route path="/contact"  />
          <Route path="/faq" />
        </Routes>
        <Footer />
      </Router>

    </ThemeProvider>
  );
}

export default App;
