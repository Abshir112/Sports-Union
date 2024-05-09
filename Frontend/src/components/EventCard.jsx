import React, {useState} from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import EditModal from '../components/EditModal';
import ConfirmDelete from '../components/ConfirmDelete';
import { useAuthContext } from '../hooks/useAuthContext';
import Box from '@mui/material/Box';

const EventCard = (props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {user} = useAuthContext();

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEdit = (editedData) => {
    try {
      fetch(`http://localhost:3000/${props.cardType}/${editedData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(editedData)
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
      fetch(`http://localhost:3000/${props.cardType}/${props.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
    }
    catch (error) {
      console.error(`Failed to delete ${props.cardType}`, error);
    }
  }
  return (<>
    <Card id={props.id}  variant="outlined" sx={{  m: 2, boxShadow: 3, p: 2}}>
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
                <DateRangeOutlinedIcon fontSize="small" sx={{ mr: 1, color:"black" }} />
                <Typography variant="body1" component="span" letterSpacing={1} marginRight={2} sx={{color:"black"}}>
                  {props.date}
                </Typography>
                <AccessTimeIcon fontSize="small" sx={{ ml: 1, color:"black"}} /> 
                <Typography variant="body1" component="span" marginRight={2} sx={{ mx: 1, color:"black" }}>
                  {props.time}
                </Typography>
                <PlaceOutlinedIcon fontSize="small" sx={{ mx: 1, color:"black" }} /> 
                <Typography variant="body1" component="span" sx={{color:"black"}}>
                  {props.location}
                </Typography>
              </Box>
              <Typography variant="body2">
                {props.description}
              </Typography>
              {props.cardType === 'activities' && 
                <Typography variant="body1" sx={{color:"black"}} >
                  Max Participants: {props.maxParticipants}
                </Typography>
              }
            </Box>
            <CardActions sx={{ justifyContent: 'start' }}>
              <Button 
               size="small" variant="contained" sx={{ backgroundColor: 'black', color: 'white' }} onClick={props.btnClick} >
                Reserve
              </Button>
              <Button 
               size="small" variant="contained" sx={{ backgroundColor: 'black', color: 'white', display: props.show || 'none' }} onClick={handleEditModalOpen} >
                Edit
              </Button>
              <Button 
               size="small" variant="contained" sx={{ backgroundColor: 'black', color: 'white', display: props.show || 'none'}} onClick={handleDeleteModalOpen} >
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
          ...(props.cardType === 'activities' && { maxParticipants: props.maxParticipants }),
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
