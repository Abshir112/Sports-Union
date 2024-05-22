import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useSignup } from '../hooks/useSignup';
import { useTheme } from '@mui/material';



function SignUp() {
    const theme = useTheme();
    
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
            redirect('/');
        }

      };
      
      

  return (
    <Container component="main" maxWidth="md" style={{marginTop: '35px', marginBottom:'40px', backgroundColor: theme.palette.background.paper, borderRadius: "2%" }}>
      <Grid container spacing={2}>
        {/* Form Section */}
        <Grid item xs={12} md={6}>
          <Typography mt={2} component="h5" variant="h5" color={theme.palette.primary.main}>
            Create Account
          </Typography>
          <form style={{margin: '10px' }} method='POST' id='signUpForm' onSubmit={handleSubmit}>
            {Object.keys(values).map(key => (
                <TextField
                key={key}
                variant="outlined"
                margin="normal"
                required={key !== 'personnummer'}
                fullWidth
                id={key}
                name={key}
                label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                autoComplete={key}
                type={key === 'password' ? 'password' : 'text'} // Set type to 'password' for password field
                value={values[key]}
                onChange={handleChange}
                placeholder={key === 'personnummer' ? 'YYYYMMDD-XXXX' : ''}
                InputLabelProps={{
                  style: { color: theme.palette.primary.main }
                }}
                inputProps={{
                  style: { color: theme.palette.primary.main }
                }}
                />
            ))}
            <Button disabled={isLoading} type="submit" fullWidth variant="contained" color="primary" style={{ margin: '24px 0 16px' }}>
                Sign Up
            </Button>
            <Typography color={theme.palette.primary.main}>
                Already have an account?  <Link component={RouterLink} to="/signIn" underline="hover" color={theme.palette.text.secondary}>Login</Link>
            </Typography>
            </form>
            {error && (
            <Typography variant="body1" style={{ color: 'red', textAlign: 'center' }}>
              {error}
            </Typography>
          )}
        </Grid>
        {/* Image Section */}
        <Grid item xs={12} md={6} style={{display: 'flex', justifyContent: 'flex-end', marginBottom: "20px" }}>
          <img src="https://i.ibb.co/DCd1JF9/bannerhkif.png" alt="bannerghkif" style={{ width: '100%', maxHeight: '800px', borderRadius: "5%" }} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignUp;

