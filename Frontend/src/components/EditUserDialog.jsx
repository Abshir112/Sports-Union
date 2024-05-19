import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { Typography, IconButton } from '@mui/material';
import { useAuthContext } from "../hooks/useAuthContext";

const EditUserDialog = ({ open, handleClose}) => {
  const { user} = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUser] = useState({
    name: user.user.name,
    email: user.user.email,
    phone: user.user.phone,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      fetch(`https://sports-union.onrender.com/users/${user.user._id}`,
      {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      }
      )
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => {
          console.error('Error fetching user data:', error);
          setError('Error fetching user data');
        });
    }
  }, [open, user.user._id, user.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...userData, [name]: value });
  };

  const handleSave = () => {
    const { name, email, phone } = userData;
    if (!name || !email || !phone) {
      setError('All fields are required.');
      return;
    }

    fetch(`https://sports-union.onrender.com/users/update-user/${user.user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => {
        const updatedUser = { ...user, user: data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEditing(false);
        handleClose();
      })
      .catch(error => {
        console.error('Error updating user data:', error);
        setError('Error updating user data');
      });
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ style: { backgroundColor: '#2C2F33', color: 'white' } }}>
      <DialogTitle>
        <Typography variant="h6" component="div" style={{ color: 'white' }}>
          User Profile
          <IconButton onClick={() => setIsEditing(true)} sx={{ color: 'white', marginLeft: 2 }}>
            <EditIcon />
          </IconButton>
        </Typography>
      </DialogTitle>
      <DialogContent style={{backgroundColor: '#eeeeee'}}>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="First Name"
          type="text"
          fullWidth
          value={userData.name}
          onChange={handleChange}
          InputLabelProps={{
            style: { color: 'black' },
          }}
          InputProps={{
            style: { color: 'black' },
          }}
          disabled={!isEditing}
        />
        <TextField
          margin="dense"
          name="email"
          label="Name"
          type="email"
          fullWidth
          value={userData.email}
          onChange={handleChange}
          InputLabelProps={{
            style: { color: 'black' },
          }}
          InputProps={{
            style: { color: 'black' },
          }}
          disabled={!isEditing}
        />
        <TextField
          margin="dense"
          name="phone"
          label="Phone"
          type="text"
          fullWidth
          value={userData.phone}
          onChange={handleChange}
          InputLabelProps={{
            style: { color: 'black' },
          }}
          InputProps={{
            style: { color: 'black' },
          }}
          disabled={!isEditing}
        />
      </DialogContent>
      {isEditing && (
        <DialogActions>
          <Button onClick={() => setIsEditing(false)} style={{ backgroundColor: '#E53935', color: 'white', borderRadius: '20px', margin: '0 10px' }}>
            Cancel
          </Button>
          <Button onClick={handleSave} style={{ backgroundColor: '#E53935', color: 'white', borderRadius: '20px', margin: '0 10px' }}>
            Save
          </Button>
        </DialogActions>
      )}
      {error && <Typography color="error" sx={{ padding: 2 }}>{error}</Typography>}
    </Dialog>
  );
};

export default EditUserDialog;
