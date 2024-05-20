import React, {useState} from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Grid, useMediaQuery } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import EditModal from '../components/EditModal';
import ConfirmDelete from '../components/ConfirmDelete';
import { useAuthContext } from '../hooks/useAuthContext';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';

const EventCard = (props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const storedCards = JSON.parse(localStorage.getItem(props.cardType) || '[]');
  const card = storedCards.find(card => card._id === props.id);


  const {user} = useAuthContext();

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEdit = (editedData) => {
    try {
      fetch(`https://sports-union.onrender.com/api/v1/${props.cardType}/${editedData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(editedData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update activity');
        }
        return response.json();
      })
      .then(data => {
        window.location.reload();
      })
      } catch (error) {
        console.error(`Failed to update ${props.cardType}`, error);
      }
  }

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDelete = () => {
    try {
      fetch(`https://sports-union.onrender.com/api/v1/${props.cardType}/${props.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      window.location.reload();
    }
    catch (error) {
      console.error(`Failed to delete ${props.cardType}`, error);
    }

  }
  return (<>
    <Card id={props.id}  variant="outlined" sx={{m: 1, boxShadow: 3, p: 2, background: theme.card.background, width: "95%"}} >
      <Grid container spacing={12}  >
        <Grid item xs={12} sm={6} md={6} lg={4} >
          <CardMedia
            component="img"
            image={props.image || "https://via.placeholder.com/150"}
            alt={props.title + "image"}
            sx={{ width: '100%', height: 'auto', objectFit: 'cover'}}  
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={8}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', marginLeft: '0'}}>
            <Box sx={{ color: 'white', fontWeight: '900' }}>
              <Typography gutterBottom variant="h4" component="div">
                {props.title}
              </Typography>
              <Box display="flex"  flexDirection="column"
              sx={{ color: 'white', paddingBottom: '10px'}}>
                <Box>
                  <DateRangeOutlinedIcon fontSize="small" sx={{ ml: 1, mr: 1, color: !isSmallScreen ? theme.palette.text.secondary : theme.palette.text.primary }} />
                  <Typography variant="body1" component="span" letterSpacing={1} marginRight={2} >
                    {props.date}
                  </Typography>
                </Box>

                <Box>
                  <AccessTimeIcon fontSize="small" sx={{ ml: 1, color: !isSmallScreen ?theme.palette.text.secondary : theme.palette.text.primary}} /> 
                  <Typography variant="body1" component="span" marginRight={2} sx={{ mx: 1}}>
                    {props.time}
                  </Typography>
                </Box>

                <Box>
                  <PlaceOutlinedIcon fontSize="small" sx={{ mx: 1, color: !isSmallScreen ? theme.palette.text.secondary : theme.palette.text.primary }} /> 
                  <Typography variant="body1" component="span" >
                    {props.location}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2">
                {props.description}
              </Typography>

              <Typography variant="body1"  >
                Max Participants: <span style={{color: theme.palette.text.secondary}}>{card.maxParticipants}</span>
              </Typography>

              
              <Typography variant="body1"  >
                Available Spots: <span style={{color: theme.palette.text.secondary}}>{card.availableSpots}</span>
              </Typography>

            </Box>
            <CardActions sx={{ justifyContent: 'start' }}>
              <Button 
               size="small" variant="contained" sx={{ backgroundColor: props.reserved ? "red" : "green" , color: 'white' }} 
               disabled= {props.maxParticipants - props.currentParticipants <= 0 && !props.reserved} 
               onClick={
                props.reserved ? props.handleUnreserve : props.handleReserve
               } >
                {props.reserved ? 'Unreserve' : props.currentParticipants === props.maxParticipants ? 'Full' : 'Reserve'}
                
              </Button>
              <Button  
               size="small" variant="contained" sx={{ backgroundColor: theme.button.secondary.backgroundColor, color: 'white', display: props.show || 'none' }} onClick={handleEditModalOpen} >
                Edit
              </Button>
              <Button 
               size="small" variant="contained" sx={{ backgroundColor: theme.button.secondary.backgroundColor, color: 'white', display: props.show || 'none'}} onClick={handleDeleteModalOpen} >
                Remove
              </Button>
            </CardActions>
          </CardContent>
        </Grid>
      </Grid>
    </Card>

      {/* Render Edit Modal */}
      <EditModal
        open={isEditModalOpen}
        handleClose={handleEditModalClose}
        eventData={{
          id: props.id,
          date: props.date,
          title: props.title,
          time: props.time,
          location: props.location,
          description: props.description,
          maxParticipants: props.maxParticipants,
          availableSpots: props.availableSpots,
        }}
        handleEdit={handleEdit}
      />

      {/* Render Confirm Delete Modal */}
      <ConfirmDelete
        open={isDeleteModalOpen}
        handleClose={handleDeleteModalClose}
        handleDelete={handleDelete}
        activityName={props.title}
        cardType={props.cardType}
      />
    </>
  );
}

export default EventCard;
