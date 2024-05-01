import React from 'react';
import { Container, TextField, Button, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';

function SignIn() {
  return (
    <Container component="main" maxWidth="md" style={{marginTop: '20px', marginBottom:'40px'}}>
      <Grid container spacing={2}>
        {/* Form Section */}
        <Grid item xs={12} md={6} style={{marginTop: '100px'}}>
          <Typography component="h1" variant="h5" align='center'>
            Log In
          </Typography>
          <form style={{ marginTop: '10px' }}>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="Email"
              autoComplete="ssn"
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