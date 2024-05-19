
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