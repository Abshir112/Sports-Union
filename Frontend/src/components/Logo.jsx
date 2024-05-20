import LogoImg from '../assets/logo.png';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Logo = () => {
    const {user} = useAuthContext();
    return ( 
        <>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 2,
            }}
        >
            <Link to={user ? "/events" : "/"} >
                <img src={LogoImg} alt="Logo" style={{ width: 40, height: 40 }} />
            </Link>

            <Typography variant="subtitle1" component="div" sx={{
            color: '#fff',  // White text color
            fontSize: '0.5rem',  // Adjust size as needed
            fontWeight: 'bold',  // Bold font
            fontFamily: '"Vollkorn", Arial' , // Font type
            textTransform: 'uppercase',  // UPPERCASE text
            textAlign: 'center',  // Center align text
        }}>
            Högskolan <br /> Kristianstad <br /> Idrottsförening
        </Typography>

        </Box>

        </>
     );
}
 
export default Logo;