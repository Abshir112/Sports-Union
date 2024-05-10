import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

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

export default function EditModal({ open, handleClose, eventData, handleEdit }) {
  const [editedData, setEditedData] = useState(eventData);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const checkInputs = (e) => {
    e.preventDefault();
    for (const key in editedData) {
      if (editedData[key] === '') {
        setError('Please fill in all fields');
        return false;
      }
    }
    setError('');
    return true;
  };



  const handleSave = (e) => {
    if (!checkInputs(e)) return;
    handleEdit(editedData);
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
        <Typography  id="modal-modal-title" variant="h6" component="h2">
          Edit
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label htmlFor="title">Title:  </label>
            <input type="text" name="title" value={editedData.title} onChange={handleInputChange} />
            <br />
            <label htmlFor="date">Date:  </label>
            <input type="date" name="date" value={editedData.date} onChange={handleInputChange} />
            <br />
            <label htmlFor="time">Time:  </label>
            <input type="time" name="time" value={editedData.time} onChange={handleInputChange} />
            <br />
            <label htmlFor="location">Location:  </label>
            <input type="text" name="location" value={editedData.location} onChange={handleInputChange} />
            <br />
            <label htmlFor="description">Description:  </label>
            <textarea  style={{resize: 'none', width: '100%', height: '100px'}} type="text" name="description" value={editedData.description} onChange={handleInputChange}  />
            <label htmlFor="maxParticipants">Max Participants:  </label>
            <input type="number" name="maxParticipants" value={editedData.maxParticipants} onChange={handleInputChange} />
        </Typography>
        <Button sx={{ mr: 2, mt: 4, bgcolor: 'green', color: 'white' }} onClick={handleSave}>Save</Button>
        <Button sx={{ mt: 4, bgcolor: 'red', color: 'white' }} onClick={handleClose}>Cancel</Button>
        <Typography variant="body1" sx={{ color: 'red', mt: 2 }}>
          {error}
        </Typography>
      </Box>

    </Modal>
  );
}
