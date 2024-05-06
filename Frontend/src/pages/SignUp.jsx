import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useSignup } from '../hooks/useSignup';



function SignUp() {
    
    const redirect = useNavigate();
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        personnummer: '',
        password: ''
    });

    const { error, isLoading, signup } = useSignup();
    

    const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
        ...values,
        [name]: value
    });
    };

      const handleSubmit = async (event) => {
        event.preventDefault();
        const success = await signup(values.email, values.password, values.firstName + ' ' + values.lastName, values.phone, values.personnummer);
        if (success) {
            redirect('/signIn');
        }

      };
      
      

  return (
    <Container component="main" maxWidth="md" style={{marginTop: '20px', marginBottom:'40px'}}>
      <Grid container spacing={2}>
        {/* Form Section */}
        <Grid item xs={12} md={6}>
          <Typography component="h1" variant="h5">
            Create Account
          </Typography>
          <form style={{ marginTop: '10px' }} method='POST' id='signUpForm' onSubmit={handleSubmit}>
            {Object.keys(values).map(key => (
                <TextField
                key={key}
                variant="standard"
                margin="normal"
                required
                fullWidth
                id={key}
                name={key}
                label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                autoComplete={key}
                type={key === 'password' ? 'password' : 'text'} // Set type to 'password' for password field
                value={values[key]}
                onChange={handleChange}
                />
            ))}
            <Button disabled={isLoading} type="submit" fullWidth variant="contained" color="primary" style={{ margin: '24px 0 16px' }}>
                Sign Up
            </Button>
            <Typography>
                Already have an account?  <Link component={RouterLink} to="/signIn" underline="hover">Login</Link>
            </Typography>
            </form>
            {error && (
            <Typography variant="body1" style={{ color: 'red', textAlign: 'center' }}>
              {error}
            </Typography>
          )}
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

