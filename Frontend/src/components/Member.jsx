import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Member = (props) => {

    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        width: '100%'
    };

    return (
        <Card id={props.member._id} sx={style}>
            <Stack direction="row" spacing={2} alignItems="center">
                <Avatar>{props.member.name.charAt(0)}</Avatar>
                <div>
                    <Typography variant="h6" component="h2" style={{ color: 'red' }}>
                        {props.member.name}
                    </Typography>
                    <Typography color="textSecondary">
                        {props.member.email}
                    </Typography>
                </div>
                <div></div>
            </Stack>
            <Stack direction="row" spacing={1} mr={2}>
                <Button variant="contained" color="warning" >Edit</Button>
                <Button variant="contained" color="secondary">Delete</Button>
            </Stack>
        </Card>
    );
};

export default Member;
