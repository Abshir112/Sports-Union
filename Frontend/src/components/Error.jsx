// Create an error component that will be displayed when there is an error fetching the data from the server.
// The component should display an error message and a button to reload the page.

import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Error = ({ error, reload }) => {  
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <Box>
                <Typography variant="h6" align="center">{error}</Typography>
                <Button onClick={reload} variant="contained" color="primary">Reload</Button>
            </Box>
        </Box>
    )
}


export default Error;