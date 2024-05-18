import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningIcon from '@mui/icons-material/Warning';
import { useAuthContext } from '../hooks/useAuthContext';

const RegisteredActivitiesCard = () => {
  const [activities, setActivities] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users-activities/${user.user._id}`,
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
          fetch(`http://localhost:3000/activities/${activity.activityId}`,
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
    <Card sx={{ maxWidth: 400, backgroundColor: '#D9531E', color: 'white', padding: 2, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ marginBottom: 2, textAlign: 'center', fontWeight: 'bold' }}>
          REGISTERED ACTIVITIES
        </Typography>
        {activities.length > 0 ? (
          activities.map((activity, index) => (
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
          ))
        ) : (
          <Box sx={{ textAlign: 'center', marginTop: 4 }}>
            <Typography variant="h6" component="div">
              You are caught up!!
            </Typography>
            <Typography variant="body1" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, marginTop: 1 }}>
              No registered Activities.
              <WarningIcon sx={{ marginLeft: 1 }} />
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RegisteredActivitiesCard;
