import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuthContext } from '../hooks/useAuthContext';
import NotificationModal from './AddNotificationModal';

const NotificationCard = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuthContext();
  const [editNotification, setEditNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('https://sports-union.onrender.com/api/v1/notifications',
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

  
    const handleAddNotification = () => {
        setEditNotification(null);
        setIsModalOpen(true);
    };

    const handleEditNotification = (notification) => {
        setEditNotification(notification);
        setIsModalOpen(true);
    };

    const handleDeleteNotification = async (id) => {
        try {
        await fetch(`https://sports-union.onrender.com/api/v1/notifications/${id}`, {
            method: 'DELETE',
            headers: {
            'Authorization': `Bearer ${user.token}`
            }
        });
        setNotifications(notifications.filter(notification => notification._id !== id));
        } catch (error) {
        console.error('Error deleting notification:', error);
        }
    };

    const handleSaveNotification = async (notification) => {
        const method = notification._id ? 'PUT' : 'POST';
        const url = notification._id ? `https://sports-union.onrender.com/api/v1/notifications/${notification._id}` : 'https://sports-union.onrender.com/api/v1/notifications';

        try {
        const response = await fetch(url, {
            method,
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(notification)
        });

        const savedNotification = await response.json();
        if (method === 'POST') {
            setNotifications([...notifications, savedNotification]);
        } else {
            setNotifications(notifications.map(n => n._id === savedNotification._id ? savedNotification : n));
        }

        setIsModalOpen(false);
        } catch (error) {
        console.error(`Error ${method === 'POST' ? 'creating' : 'updating'} notification:`, error);
        }
    };

  return (
    <Card sx={{ maxWidth: 400, backgroundColor: '#2C2F33', color: 'white', padding: 2, borderRadius: 3 }}>
        {user && user.user.role === 'admin' && (
          <Button variant="contained" onClick={handleAddNotification} sx={{ marginTop: 2 }}>
            Add Notification
          </Button>
        )}
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
            {user && user.user.role === 'admin' && (
              <Box>
                <IconButton onClick={() => handleEditNotification(notification)} sx={{ color: 'white' }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteNotification(notification._id)} sx={{ color: 'red' }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        ))}
       
      </CardContent>
      <NotificationModal
        open={isModalOpen}
        notification={editNotification}
        onSave={handleSaveNotification}
        onClose={() => setIsModalOpen(false)}
      />
    </Card>
  );
};

export default NotificationCard;
