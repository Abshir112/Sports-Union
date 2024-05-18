// eslint-disable-next-line no-unused-vars
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



const NotificationCard = () => {
  return (
    <Card sx={{ maxWidth: 400, backgroundColor: '#2C2F33', color: 'white', padding: 2, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ marginBottom: 4 }}>
          Notification
        </Typography>
        {/* {notifications.map((notification, index) => (
          <Box key={index} sx={{ marginBottom: 3 }}>
            <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
              {notification.date}
            </Typography>
            <Typography variant="body2" component="p">
              {notification.message} */}
              
            {/* </Typography>
          </Box>
        ))} */}
        <Typography variant="h6" >2024-03-21</Typography>
        <Typography variant = "body">Swimming activities announced next week would be postponed to other week.</Typography>
        <Typography variant="h6">2024-05-29</Typography>
        <Typography variant = "body">Watch out!! This month we limit the number of participants for the volleyball tournment. </Typography>
        <Typography variant="h6" >2024-03-21</Typography>
        <Typography variant = "body">Swimming activities announced next week would be postponed to other week.</Typography>
        <Typography variant="h6">2024-05-29</Typography>
        <Typography variant = "body">Watch out!! This month we limit the number of participants for the volleyball tournment.</Typography>
        <Typography variant="h6" >2024-03-21</Typography>
        <Typography variant = "body">Swimming activities announced next week would be postponed to other week.</Typography>
        <Typography variant="h6">2024-05-29</Typography>
        <Typography variant = "body">Watch out!! This month we limit the number of participants for the volleyball tournment.</Typography>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
