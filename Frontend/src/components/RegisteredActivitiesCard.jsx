// eslint-disable-next-line no-unused-vars
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const activities = [
  // {
  //   name: 'Swimming',
  //   date: '2024-08-11',
  //   time: '17:00'
  // },
  {
    name: 'Volley Ball',
    date: '2024-08-11',
    time: '17:00'
  },
  {
    name: 'Climbing',
    date: '2024-08-11',
    time: '17:00'
  }
];

const RegisteredActivitiesCard = () => {
  return (
    <Card sx={{ maxWidth: 400, backgroundColor: '#D9531E', color: 'EEEEEE', padding: 2, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ marginBottom: 2, textAlign: 'center', fontWeight: 'bold' }}>
          REGISTERED ACTIVITIES
        </Typography>
        {activities.map((activity, index) => (
          <Box key={index} sx={{ marginBottom: 3, textAlign: 'center' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
              {activity.name.toUpperCase()}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
              <CalendarTodayIcon />
              <Typography variant="body1">{activity.date}</Typography>
              <AccessTimeIcon />
              <Typography variant="body1">{activity.time}</Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default RegisteredActivitiesCard;
