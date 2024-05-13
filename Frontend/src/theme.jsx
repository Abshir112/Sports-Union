import { createTheme } from '@mui/material/styles';

{/* Theme for the website
#222831
#393e46
#d65a31
#eeeeee
linear gradient: #d65a31 #393E46
*/}

export const theme = createTheme({
    palette: {
        primary: {
            main: '#222831',
        },
        secondary: {
            main: '#393e46',
        },

        background: {
            default: '#222831',
            paper: '#eeeeee',
        },
        text: {
            primary: '#eeeeee',
            secondary: '#D65A31'

        },
        
    },
    typography: {
        fontFamily: '"Vollkorn SC", Arial, sans-serif'
    },

    button: {
      primary: {
        backgroundColor: '#393E46',
        color: '#eeeeee',
      },
      secondary: {
        backgroundColor: '#D65A31',
        color: '#eeeeee',
      },
    },  
  });