import React from 'react';
import { Button, TextField, Container } from '@mui/material';


const SignIn = () => {
    return (
    <>
    <Container>
        <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
        />
        <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
        />
        <Button variant="contained" color="primary" fullWidth>
            Sign In
        </Button>

    </Container>

    </>

    );
}
 
export default SignIn;