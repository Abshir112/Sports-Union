// create a member component that will display a member card with the following details:
// - Name
// - Email
// - Phone
// - Personal Number
// - Role
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Member = (props) => {

    const style = {
        width: '100%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        color: 'black',
    }; 

    return (
        <Card id={props.key} sx={style} >
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.member.name}
                </Typography>
                <Typography color="black">
                    {props.member.email}
                </Typography>
                <Typography color="black">
                    {props.member.phone}
                </Typography>
                <Typography color="black">
                    {props.member.personalNumber}
                </Typography>
                <Typography color="black">
                    {props.member.role}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Member;