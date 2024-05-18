import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const UserProfileCard = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Profile data saved:', profileData);
  };

  const handleCancel = () => {
    // Handle cancel logic here (e.g., reset the form or close the modal)
    console.log('Profile data editing canceled');
  };

  return (

    <Card sx={{ maxWidth: 400, backgroundColor: '#222831', color: 'white', padding: 2, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
          User Profile
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={profileData.firstName}
            onChange={handleInputChange}
            variant="standard"
            margin="normal"
            InputLabelProps={{ style: { color: '#EEEEEE' } }}
            InputProps={{ style: { color: '#EEEEEE' } }}
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={profileData.lastName}
            onChange={handleInputChange}
            variant="standard"
            margin="normal"
            
            InputLabelProps={{ style: { color: '#EEEEEE' } }}
            InputProps={{ style: { color: '#EEEEEE' } }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            variant="standard"
            margin="normal"
            InputLabelProps={{ style: { color: '#EEEEEE' } }}
            InputProps={{ style: { color: '#EEEEEE' } }}
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={profileData.phone}
            onChange={handleInputChange}
            variant="standard"
            margin="normal"
            InputLabelProps={{ style: { color: '#EEEEEE' } }}
            InputProps={{ style: { color: '#EEEEEE' } }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: '#D65A31', color: '#EEEEEE' }}>
              Save
            </Button>
            <Button variant="text"  onClick={handleCancel} sx={{backgroundColor: '#D65A31', color: '#EEEEEE' }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>

  );
};

export default UserProfileCard;
