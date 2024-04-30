import {
AppBar,
Toolbar,
CssBaseline,
Box
} from "@mui/material";
import { Link } from "react-router-dom";
import AdbIcon from '@mui/icons-material/Adb'
  
function Navbar() {
return (
    <nav>   
        <AppBar position="static" >
            <CssBaseline />
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: '#000',
                width: '100%',
            }}>
                <Link href="/">
                    <AdbIcon sx={{
                        color: '#fff',
                        fontSize: 40,
                        marginX: 15
                    }} />
                </Link>

                <Box sx={{
                    display: 'flex',
                    gap: 10,
                    marginX: 15,
                    flexWrap: 'wrap'
                }} >
                        <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
                            Home
                        </Link>
                        <Link to="/about" style={{ textDecoration: 'none', color: '#fff' }}>
                            About
                        </Link>
                        <Link to="/contact" style={{ textDecoration: 'none', color: '#fff' }}>
                            Events
                        </Link>
                        <Link to="/Members" style={{ textDecoration: 'none', color: '#fff' }}>
                            Members
                        </Link>
                        <Link to="/Stories" style={{ textDecoration: 'none', color: '#fff' }}>
                            Stories
                        </Link>
                </Box>

            </Toolbar>
        </AppBar>
    </nav>
);
}
export default Navbar;