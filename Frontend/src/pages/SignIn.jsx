import { useState } from 'react';
import { Container, TextField, Button, Typography, Grid} from '@mui/material';
import { useLogin } from '../hooks/useLogin';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const redirect = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const { error, isLoading, login } = useLogin();
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await login(values.email, values.password);
    if (success) {
      redirect('/activities');
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: '24px 0 16px' }}
              disabled={isLoading}
            >
              Sign In
            </Button>

            <Button component={RouterLink} to="/signUp"  fullWidth variant="contained" color="primary"  style={{ margin: '24px 0 16px' }}>
            Sign Up
            </Button>   
            
          </form>
           {/* Error Display */}
          {error && (
            <Typography variant="body1" style={{ color: 'red', textAlign: 'center' }}>
              {error}
            </Typography>
          )}
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
