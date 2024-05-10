import Box from '@mui/material/Box';
import { useState } from 'react';
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

const AddActivityModal = ({ open, handleClose, handleAdd }) => {
  const [activityData, setActivityData] = useState({
    date: '',
    activityName: '',
    time: '',
    location: '',
    description: '',
    maxParticipants: 0,
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivityData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const checkInputs = (e) => {
    e.preventDefault();
    for (const key in activityData) {
      if (activityData[key] === '') {
        setError('Please fill in all fields');
        return false;
      }
    }
    // Convert maxParticipants to number
    activityData.maxParticipants = parseInt(activityData.maxParticipants); 
    setError('');
    return true;
  };

  const handleSave = (e) => {
    if (!checkInputs(e)) return;
    handleAdd(activityData);
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
          Add Activity
        </Typography>
        <form action="">
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label>
              Activity Name:
              <input required type="text" name="activityName" value={activityData.activityName} onChange={handleInputChange} style={{ width: '100%' }} />
            </label>
            <label style={{ display: 'block', marginTop: 8 }}>
              Date:
              <input type="date" name="date" value={activityData.date} onChange={handleInputChange} style={{ width: '100%' }} />
            </label>
            <label style={{ display: 'block', marginTop: 8 }}>
              Time:
              <input type="time" name="time" value={activityData.time} onChange={handleInputChange} style={{ width: '100%' }} />
            </label>
            <label style={{ display: 'block', marginTop: 8 }}>
              Location:
              <input type="text" name="location" value={activityData.location} onChange={handleInputChange} style={{ width: '100%' }} />
            </label>
            <label style={{ display: 'block', marginTop: 8 }}>
              Description:
              <textarea style={{ resize: 'none', width: '100%', height: '100px' }} type="text" name="description" value={activityData.description} onChange={handleInputChange} /> 
            
            </label>
            <label style={{ display: 'block', marginTop: 8 }}>
              Max Participants:
              <input type="number" name="maxParticipants" value={activityData.maxParticipants} onChange={handleInputChange} style={{ width: '100%' }} />
            </label>
        </Typography>
          <Button type="submit" sx={{ mr: 2, mt: 4, bgcolor: 'green', color: 'white' }} onClick={handleSave}>Save</Button>
          <Button sx={{ mt: 4, bgcolor: 'red', color: 'white' }} onClick={handleClose}>Cancel</Button>
        </form>
        <Typography variant="body1" sx={{ color: 'red', mt: 2 }}>
          {error}
        </Typography>

      </Box>
    </Modal>
  );
};

export default AddActivityModal;
