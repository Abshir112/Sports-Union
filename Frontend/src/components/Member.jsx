// create a member component that will display a member card with the following details:
// - Name
// - Email
// - Phone
// - Role


import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Box, TextField, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const Member = ({members}) => {
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', padding: 2 }}>
      <Box sx={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search"
          size="small"
          InputProps={{
            endAdornment: (
              <Button variant="contained" color="primary" sx={{ marginLeft: 1 }}>
                SEARCH
              </Button>
            ),
          }}
        />
      </Box>
      <List>
        {members.map((member, index) => (
          <ListItem key={index} sx={{ padding: '10px 0' }}>
            <ListItemAvatar>
              <Avatar>{member.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                  {member.name}
                </Typography>
              }
              secondary={member.email}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Member;


// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';

// const Member = (props) => {

//     const style = {
//         width: '100%',
//         bgcolor: 'background.paper',
//         border: '2px solid #000',
//         boxShadow: 24,
//         p: 4,
//         color: 'black',
//     }; 

//     return (
//         <Card id={props.key} sx={style} >
//             <CardContent>
//                 <Typography variant="h5" component="h2">
//                     {props.member.name}
//                 </Typography>
//                 <Typography color="black">
//                     {props.member.email}
//                 </Typography>
//                 <Typography color="black">
//                     {props.member.phone}
//                 </Typography>
//                 <Typography color="black">
//                     {props.member.personalNumber}
//                 </Typography>
//                 <Typography color="black">
//                     {props.member.role}
//                 </Typography>
//             </CardContent>
//         </Card>
//     );
// };
// // {props.member.name}
// export default Member;