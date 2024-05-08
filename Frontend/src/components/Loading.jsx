// Create a loading component that will be displayed when the data is being fetched from the server.
// The component should display a spinner and a message "Loading..." when the data is being fetched.
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';  
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Loading = () => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <Box>
                <CircularProgress />
                <Typography variant="h6" align="center">Loading...</Typography>
            </Box>
        </Box>
    )
}

export default Loading;
