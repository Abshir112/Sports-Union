import React from 'react';
import {Hero} from './pages/Hero';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from './components/Footer';
import {theme} from './theme';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Events from './pages/Events';
import Activities from './pages/Activities';
import Members from './pages/AllMembers';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About/>} />
          <Route path="/activities" element={<Activities />}  />
          <Route path="/signIn" element={<SignIn/>} />
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/events" element={<Events/>} />
          <Route path='/members' element={<Members/>} /> 
        </Routes>
        <Footer />
      </Router>

    </ThemeProvider>
  );
}

export default App;
