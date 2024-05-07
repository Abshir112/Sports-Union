import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box, Grid } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';

const EventCard = (props) => {
  return (
    <Card variant="outlined" sx={{  m: 2, boxShadow: 3, p: 2 }}>
      <Grid container spacing={12} >
        <Grid item xs={12} sm={6} md={6} lg={4} >
          <CardMedia
            component="img"
            image={props.image || "https://via.placeholder.com/150"}
            alt={props.title + "image"}
            sx={{ width: '100%', height: 'auto', maxWidth: 300, objectFit: 'cover', borderRadius: 5}}  
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={8}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', marginLeft: '0'}}>
            <Box sx={{ color: 'orange', fontWeight: '900' }}>
              <Typography gutterBottom variant="h4" component="div">
                {props.title}
              </Typography>
              <Box display="flex" alignItems="center" sx={{ color: 'white', paddingBottom: '10px'}}>
                <DateRangeOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body1" component="span" letterSpacing={1} marginRight={2}>
                  {props.date}
                </Typography>
                <AccessTimeIcon fontSize="small" sx={{ ml: 1}} /> 
                <Typography variant="body1" component="span" marginRight={2} sx={{ mx: 1 }}>
                {props.time}
                </Typography>
                <PlaceOutlinedIcon fontSize="small" sx={{ mx: 1 }} /> 
                <Typography variant="body1" component="span">
                  {props.location}
                </Typography>
              </Box>
              <Typography variant="body2">
                {props.description}
              </Typography>
            </Box>
            <CardActions sx={{ justifyContent: 'start' }}>
              <Button size="small" variant="contained" sx={{ backgroundColor: 'black', color: 'white' }}>
                Reserve
              </Button>
            </CardActions>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default EventCard;
