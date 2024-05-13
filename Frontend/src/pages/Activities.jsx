import {useState, useEffect} from "react";
import {Button, Container } from "@mui/material";
import EventCard from "../components/EventCard";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';
import AddActivityModal from "../components/AddActivityModal";
import Box from '@mui/material/Box';
import Loading from "../components/Loading";
import Error from "../components/Error";
import useReserveActivity from "../hooks/useReserveActivity";
import useAddActivity from "../hooks/useAddActivity";
import { useTheme } from "@mui/material";


const Activities = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const {userActivities} = useAuthContext();
    const userRole =  user ? user.user.role : null;
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { reserveActivity, reserveError, isLoading, unReserveActivity  } = useReserveActivity();
    const { addActivity, addingActivityError, addingActivityIsLoading } = useAddActivity();

    
    useEffect(() => {
        const fetchActivities = async () => {
            console.log(typeof userActivities)
            console.log('fetching activities');
            try {
                const response = await fetch('http://localhost:3000/activities');
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const data = await response.json();
                setActivities(data);
                setError(null);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }

        }
        fetchActivities();
    }
    , []);

    const handleReserve = async (activityID) => {
        if (!user) {
            navigate('/signin');
            return;
        }
        await reserveActivity(activityID); 
    }

    const handleUnReserve = async (activityID) => {
        await unReserveActivity(activityID);
    }

    const handleAddClick = () => {
        setIsAddModalOpen(true);
    }

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    }

    const handleAddActivity =  (activityData) => {
        addActivity(activityData);
    }

    const errorReload = () => {
        setError(null);
        setLoading(true);
    }

    const checkIfReserved = (activityID) => {
        return userActivities.some(activity => activity._id === activityID); 
    }

    return ( <>
        {loading && <Loading />}
        {error && <Error error={error} reload={errorReload} />}
        {reserveError && <Error error={reserveError} />}
        {isLoading && <Loading />}
        {addingActivityError && <Error error={addingActivityError} />}
        {addingActivityIsLoading && <Loading />}
        <Box display="flex" flexDirection="column" alignItems="center" width="100%" backgroundColor={theme.palette.background.paper}>
        {
            userRole === 'admin' && 
            <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ margin: '1em'}}
            onClick={() => handleAddClick()}
            >
                Add Activity
        </Button>
            
        }
        
        {activities.map(activity => (
        <EventCard
            cardType='activities'
            key={activity._id}
            id={activity._id}
            date={activity.date}
            title={activity.activityName}
            time={activity.time}
            location={activity.location}
            description={activity.description}
            maxParticipants={activity.maxParticipants}
            image={`../../assets/${activity.activityName}.JPG`}
            handleReserve={() => handleReserve(activity._id)}
            handleUnreserve={() => handleUnReserve(activity._id)}
            show={userRole === 'admin' ? 'block' : 'none'}
            reserved={
                checkIfReserved(activity._id)
            }
        />
        ))}
        </Box>
        {/* Render Add Activity Modal */}
        <AddActivityModal open={isAddModalOpen} handleClose={handleCloseAddModal} handleAdd={handleAddActivity} />

    </> );
}
 
export default Activities;