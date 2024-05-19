import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  inputProps: { color: 'black' },
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const NotificationModal = ({ open, notification, onSave, onClose }) => {
  const [formData, setFormData] = useState({ date: '', description: '' });

  useEffect(() => {
    if (notification) {
      setFormData(notification);
    } else {
      setFormData({ date: '', description: '' });
    }
  }, [notification]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {notification ? 'Edit Notification' : 'Add Notification'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            name="date"
            label="Date"
            type="text"
            fullWidth
            value={formData.date}
            onChange={handleChange}
            InputProps={{
                style: { color: 'black' },
            }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={formData.description}
            onChange={handleChange}
            InputProps={{
                style: { color: 'black' },
            }}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Save
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default NotificationModal;
