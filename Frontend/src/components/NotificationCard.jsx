import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAuthContext } from '../hooks/useAuthContext';

const NotificationCard = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    fetch('http://localhost:3000/notifications',
      {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      }
    )
      .then(response => response.json())
      .then(data => setNotifications(data))
      .catch(error => console.error('Error fetching notifications:', error));
  }, []);

  return (
    <Card sx={{ maxWidth: 400, backgroundColor: '#2C2F33', color: 'white', padding: 2, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ marginBottom: 4 }}>
          Notification
        </Typography>
        {notifications.map((notification, index) => (
          <Box key={index} sx={{ marginBottom: 3 }}>
            <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
              {notification.date}
            </Typography>
            <Typography variant="body2" component="p">
              {notification.description}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
