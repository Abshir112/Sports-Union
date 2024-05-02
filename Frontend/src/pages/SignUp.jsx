import React, {useState} from 'react';
import { Container, TextField, Button, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';


function SignUp() {
    
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        personnummer: '',
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
        tempErrors.firstName = values.firstName ? "" : "First Name is required";
        tempErrors.lastName = values.lastName ? "" : "Last Name is required";
        tempErrors.email = values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? "" : "Email is not valid";
        tempErrors.phone = values.phone.match(/^[0-9]{10}$/) ? "" : "Phone number is not valid";
        tempErrors.personnummer = values.personnummer.match(/^[0-9]{12}$/) ? "" : "Personnummer must be 12 digits";
        tempErrors.password = values.password.length >= 6 ? "" : "Password must be at least 6 characters long";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
          console.log('Form is valid');
          // Proceed with submitting the form data to a server or API
        } else {
          console.log('Form is invalid');
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
                value={values[key]}
                onChange={handleChange}
                helperText={errors[key]}
                />
            ))}
            <Button type="submit" fullWidth variant="contained" color="primary" style={{ margin: '24px 0 16px' }}>
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

