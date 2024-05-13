import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black',
};

const AddEventModal = ({ open, handleClose, handleAdd }) => {
  const [eventData, setEventData] = useState({
    date: '',
    title: '',
    time: '',
    location: '',
    description: '',
    maxParticipants: 0,
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const checkInputs = () => {
    for (const key in eventData) {
      if (eventData[key] === '') {
        setError('Please fill in all fields');
        return false;
      }
    }
    // Convert maxParticipants to number
    eventData.maxParticipants = parseInt(eventData.maxParticipants); 
    setError('');
    return true;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!checkInputs()) return;
    handleAdd(eventData);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Event
        </Typography>
        <form onSubmit={handleSave}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label>
              Event Title:
              <input required type="text" name="title" value={eventData.title} onChange={handleInputChange} style={{ width: '100%' }} />
            </label>
            <label style={{ display: 'block', marginTop: 8 }}>
              Date:
              <input type="date" name="date" value={eventData.date} onChange={handleInputChange} style={{ width: '100%' }} />
            </label>
            <label style={{ display: 'block', marginTop: 8 }}>
              Time:
              <input type="time" name="time" value={eventData.time} onChange={handleInputChange} style={{ width: '100%' }} />
            </label>
            <label style={{ display: 'block', marginTop: 8 }}>
              Location:
              <input type="text" name="location" value={eventData.location} onChange={handleInputChange} style={{ width: '100%' }} />
            </label>
            <label style={{ display: 'block', marginTop: 8 }}>
              Description:
              <textarea style={{ resize: 'none', width: '100%', height: '100px' }} name="description" value={eventData.description} onChange={handleInputChange} />
            </label>
            <label style={{ display: 'block', marginTop: 8 }}>
              Max Participants:
              <input type="number" name="maxParticipants" value={eventData.maxParticipants} onChange={handleInputChange} style={{ width: '100%' }} />
            </label>
          </Typography>
          <Button type="submit" sx={{ mr: 2, mt: 4, bgcolor: 'green', color: 'white' }} onClick={handleSave} >Save</Button>
          <Button type="button" sx={{ mt: 4, bgcolor: 'red', color: 'white' }} onClick={handleClose}>Cancel</Button>
        </form>
        {error && <Typography variant="body1" sx={{ color: 'red', mt: 2 }}>
          {error}
        </Typography>}
      </Box>
    </Modal>
  );
};

export default AddEventModal;
