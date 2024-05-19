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
