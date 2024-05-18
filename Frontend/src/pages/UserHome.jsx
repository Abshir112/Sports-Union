import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NotificationCard from '../components/NotificationCard';
import RegisteredEventsCard from '../components/RegisteredEventsCard';
import RegisteredActivitiesCard from '../components/RegisteredActivitiesCard';
import EditUserDialog from '../components/EditUserDialog';
import { useTheme } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";

const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);
  const userId = 'USER_ID'; 

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
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ marginRight: 4, cursor: 'pointer' }} 
          onClick={handleOpen}
        >
          <span role="img" aria-label="user">👤</span> {user.user.name}
        </Typography>
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
      <EditUserDialog open={open} handleClose={handleClose} userId={userId} />
    </Box>
  );
};

export default Dashboard;
