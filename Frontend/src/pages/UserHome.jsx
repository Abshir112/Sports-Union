import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import NotificationCard from '../components/NotificationCard';
import RegisteredEventsCard from '../components/RegisteredEventsCard';
import RegisteredActivitiesCard from '../components/RegisteredActivitiesCard';
import EditUserDialog from '../components/EditUserDialog';
import { useTheme } from "@mui/material";


const Dashboard = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: 4, 
          padding: 2, 
          backgroundColor: theme.palette.background.default, 
          borderRadius: 3 
        }}
      >
        <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleOpen} sx={{ color: theme.palette.text.primary }}>
            <AccountCircle fontSize="large" />
          </IconButton>
          <Typography onClick={handleOpen} variant="h6" component="div" sx={{ marginLeft: 1 , cursor: 'pointer'}}>
            {user ? user.user.name : 'User'}
          </Typography>
          
        </Box>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <NotificationCard />
        </Grid>
        <Grid item container xs={12} md={6} spacing={4}>
          <Grid item xs={12}>
            <RegisteredEventsCard />
          </Grid>
          <Grid item xs={12}>
            <RegisteredActivitiesCard />
          </Grid>
        </Grid>
      </Grid>
      <EditUserDialog open={open} handleClose={handleClose} />
    </Box>
  );
};

export default Dashboard;
