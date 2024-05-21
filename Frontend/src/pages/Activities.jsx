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
import  useFetchUserActivites from "../hooks/useFetchUserActivites";


const Activities = () => {
    const {fetchUserActivities} = useFetchUserActivites();
    const theme = useTheme();
    const navigate = useNavigate();
    const {user, dispatch} = useAuthContext();
    const userRole =  user ? user.user.role : null;
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { reserveActivity, reserveError, isLoading, unReserveActivity  } = useReserveActivity();
    const { addActivity, addingActivityError, addingActivityIsLoading } = useAddActivity();

    
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch('https://sports-union.onrender.com/api/v1/activities');
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const data = await response.json();
                setActivities(data);
                dispatch({ type: 'SET_ACTIVITIES', payload: data });
                localStorage.setItem('activities', JSON.stringify(data));
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

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) return;
        const fetchUserActivitesWrapper = () => {
            fetchUserActivities(userData.user._id, userData.token);
        };
        fetchUserActivitesWrapper();
        const intervalId = setInterval(fetchUserActivitesWrapper, 5000); // Fetch every 5 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount

    }, []);

    const handleReserve = async (activityID) => {
        if (!user) {
            navigate('/signin');
            return;
        }
        await reserveActivity(activityID); 
    }

    const handleUnReserve = async (activityID) => {
        if (!user) {
            navigate('/signin');
            return;
        }
        await unReserveActivity(activityID);
    }

    const handleAddClick = () => {
        setIsAddModalOpen(true);
    }

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    }

    const handleAddActivity = async (activityData) => {
        await addActivity(activityData);
    }

    const errorReload = () => {
        setError(null);
        setLoading(true);
    }

    const checkIfReserved = (activityID) => {
        const userActivities = JSON.parse(localStorage.getItem('userActivities'));
        if (!userActivities) return false;
        return userActivities.some(activity => activity.activityId === activityID);
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
            image={activity.image}
            currentParticipants={activity.currentParticipants}
            availableSpots={activity.availableSpots}
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