import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useAuthContext } from "../hooks/useAuthContext";

const EditUserDialog = ({ open, handleClose, userId }) => {
  const { user } = useAuthContext();
  const [userData, setUser] = useState({
    name: user.user.name,
    email: user.user.email,
    phone: user.user.phone,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && userId) {
      fetch(`http://localhost:3000/users/${userId}`)
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => {
          console.error('Error fetching user data:', error);
          setError('Error fetching user data');
        });
    }
  }, [open, userId]);

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

    fetch(`http://localhost:3000/users/update-user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('User updated:', data);
        handleClose();
      })
      .catch(error => {
        console.error('Error updating user data:', error);
        setError('Error updating user data');
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit User Info</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={userData.name}
          onChange={handleChange}
          InputLabelProps={{
            style: { color: 'black' },
          }}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={userData.email}
          onChange={handleChange}
          InputLabelProps={{
            style: { color: 'black' },
          }}
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
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
      {error && <Typography color="error" sx={{ padding: 2 }}>{error}</Typography>}
    </Dialog>
  );
};

export default EditUserDialog;
