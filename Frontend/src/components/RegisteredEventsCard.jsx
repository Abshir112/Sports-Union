import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningIcon from '@mui/icons-material/Warning';

const events = [
  {
    name: 'HKR Marathon',
    date: '2024-08-11',
    time: '17:00'
  }
];

const RegisteredEventsCard = () => {
  return (
    <Card sx={{ maxWidth: 400, backgroundColor: '#2C2F33', color: 'white', padding: 2, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ marginBottom: 2, textAlign: 'center', fontWeight: 'bold' }}>
          REGISTERED EVENTS
        </Typography>
        {events.map((event, index) => (
          <Box key={index} sx={{ marginBottom: 3, textAlign: 'center' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
              {event.name.toUpperCase()}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, color: '#FFA500' }}>
              <CalendarTodayIcon />
              <Typography variant="body1">{event.date}</Typography>
              <AccessTimeIcon />
              <Typography variant="body1">{event.time}</Typography>
            </Box>
          </Box>
        ))}
        <Box sx={{ textAlign: 'center', marginTop: 4 }}>
          <Typography variant="h6" component="div">
            You are caught up!!
          </Typography>
          <Typography variant="body1" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, marginTop: 1 }}>
            No registered Events.
            <WarningIcon sx={{ marginLeft: 1 }} />
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RegisteredEventsCard;
