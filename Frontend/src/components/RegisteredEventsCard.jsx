import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningIcon from '@mui/icons-material/Warning';
import { useAuthContext } from '../hooks/useAuthContext';

const RegisteredEventsCard = () => {
  const [events, setEvents] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/v1/users-events/${user.user._id}`,
          {
            headers:{
              'Authorization':  `Bearer ${user.token}`
            }
          }
        );
        const userEvents = await response.json();

        const eventPromises = userEvents.map(event =>
          fetch(`/api/v1/events/${event.eventId}`,
          {
            headers:{
              'Authorization':  `Bearer ${user.token}`
            }
          }
          ).then(res => res.json())
        );

        const eventsData = await Promise.all(eventPromises);
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [user.user._id]);

  return (
    <Card sx={{  maxWidth: "100%", backgroundColor: '#2C2F33', color: 'white', padding: 2, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ marginBottom: 2, textAlign: 'center', fontWeight: 'bold' }}>
          REGISTERED EVENTS
        </Typography>
        {events.length > 0 ? (
          events.map((event, index) => (
            <Box key={index} sx={{ marginBottom: 3, textAlign: 'center' }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                {event.title}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, color: '#FFA500' }}>
                <CalendarTodayIcon />
                <Typography variant="body1">{event.date}</Typography>
                <AccessTimeIcon />
                <Typography variant="body1">{event.time}</Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Box sx={{ textAlign: 'center', marginTop: 4 }}>
            <Typography variant="h6" component="div">
            You do not have any registered events.
            </Typography>
         
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RegisteredEventsCard;