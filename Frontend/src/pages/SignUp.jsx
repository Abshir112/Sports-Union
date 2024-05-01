import React from 'react';
import { Container, TextField, Button, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';

function SignUp() {
  return (
    <Container component="main" maxWidth="md" style={{marginTop: '20px', marginBottom:'40px'}}>
      <Grid container spacing={2}>
        {/* Form Section */}
        <Grid item xs={12} md={6}>
          <Typography component="h1" variant="h5">
            Create Account
          </Typography>
          <form style={{ marginTop: '10px' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="fname"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="HKR Email"
              name="email"
              autoComplete="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              autoComplete="tel"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="personnummer"
              label="Personnummer"
              name="personnummer"
              autoComplete="ssn"
            />
            <TextField
              variant="outlined"
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
              Sign Up
            </Button>
            <Typography>
             Already have an account?  <Link component={RouterLink} to="/signIn" underline="hover">Login</Link>
             </Typography>
          </form>
        </Grid>
        {/* Image Section */}
        <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="../../assets/bannerhkif.png" alt="bannerghkif" style={{ width: '100%', maxHeight: '800px' }} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignUp;
