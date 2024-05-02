import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid} from '@mui/material';

function SignIn() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  
  const validate = () => {
    let tempErrors = {};
    tempErrors.email = values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? "" : "Email is not valid";
    tempErrors.password = values.password.length >= 6 ? "" : "Password must be at least 6 characters long";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log('Form is valid');

    } else {
      console.log('Form is invalid');
    }
  };
  return (
    <Container component="main" maxWidth="md" style={{ marginTop: '20px', marginBottom: '40px' }}>
      <Grid container spacing={2}>
        {/* Form Section */}
        <Grid item xs={12} md={6} style={{ marginTop: '100px' }}>
          <Typography component="h1" variant="h5" align="center">
            Log In
          </Typography>
          <form style={{ marginTop: '10px' }} method='POST' onSubmit={handleSubmit}>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: '24px 0 16px' }}
            >
              Sign In
            </Button>
          </form>
        </Grid>
        {/* Image Section */}
        <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="../../assets/bannerhkif.png" alt="bannerghkif" style={{ width: '90%', maxHeight: '550px' }} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignIn;
