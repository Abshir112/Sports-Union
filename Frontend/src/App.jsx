import React from 'react';
import { Hero } from './pages/Hero';
import { CssBaseline, ThemeProvider, Box, GlobalStyles } from '@mui/material';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import { theme } from './theme';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Events from './pages/Events';
import Activities from './pages/Activities';
import Members from './pages/AllMembers';
import NotFound from './pages/404';
import { useAuthContext } from './hooks/useAuthContext';
import Dashboard from './pages/UserHome';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const { user } = useAuthContext();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          'html, body': {
            margin: 0,
            padding: 0,
            width: '100%',
            height: '100%',
            overflowX: 'hidden',
          },
          '#root': {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100%',
          },
        }}
      />
      <Box
        sx={{
          padding: 0,
          margin: 0,
          width: "100%",
          minHeight: "100vh", // Ensure it takes the full height as well
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Router>
          <Navbar />
          <Box
            component="main"
            sx={{
              flex: 1,
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Routes>
              <Route path="/" element={!user ? <Hero /> : <Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/events" element={<Events />} />
              <Route path='/members' element={user?.user.role !== 'admin' ? <NotFound /> : <Members />} />
              <Route path='/admin' element={user?.user.role !== 'admin' ? <NotFound /> : <AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
          <Footer />
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
