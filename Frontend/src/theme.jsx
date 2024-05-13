import { createTheme } from '@mui/material/styles';

{/* Theme for the website
#222831 // dark blue
#393e46 // dark grey
#d65a31 // orange
#eeeeee // light grey
linear gradient: #d65a31 #393E46 // orange (13%) to dark grey (55%)
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
        fontFamily: '"Roboto", Arial, sans-serif'
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

    card:{
      background: 'linear-gradient(90deg, #D65A31 2%, #393E46 50%)',
    }
  });