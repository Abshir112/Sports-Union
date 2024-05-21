import React, { useState, useEffect, act } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useAuthContext } from '../hooks/useAuthContext';

const RegisteredActivitiesCard = () => {
  const [activities, setActivities] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`https://sports-union.onrender.com/api/v1/users-activities/${user.user._id}`,
        {
          headers:{
            'Authorization':  `Bearer ${user.token}`
          }
        }
        );
        const userActivities = await response.json();

        if (userActivities.length === 0) {
          setActivities([]); // Set empty array if no user activities
          return;
        }

        const activityPromises = userActivities.map(activity =>
          fetch(`https://sports-union.onrender.com/api/v1/activities/${activity.activityId}`,
          {
            headers:{
              'Authorization':  `Bearer ${user.token}`
            }
          }
          ).then(res => res.json())
        );

        const activitiesData = await Promise.all(activityPromises);
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, [user.user._id]);

  return (
    <Card sx={{  maxWidth: "100%", backgroundColor: '#D9531E', color: 'white', padding: 2, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ marginBottom: 2, textAlign: 'center', fontWeight: 'bold' }}>
          REGISTERED ACTIVITIES
        </Typography>
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            activity && (
            <Box key={index} sx={{ marginBottom: 3, textAlign: 'center' }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                {activity.activityName}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                <CalendarTodayIcon />
                <Typography variant="body1">{activity.date}</Typography>
                <AccessTimeIcon />
                <Typography variant="body1">{activity.time}</Typography>
              </Box>
            </Box>
            )
          ))
        ) : (
          <Box sx={{ textAlign: 'center', marginTop: 4 }}>
            <Typography variant="h6" component="div">
              You do not have any registered activities.
            </Typography>
          
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RegisteredActivitiesCard;
