import {useState, useEffect} from "react";
import {Button } from "@mui/material";
import EventCard from "../components/EventCard";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';
import AddActivityModal from "../components/AddActivityModal";
import Box from '@mui/material/Box';
import Loading from "../components/Loading";
import Error from "../components/Error";


const Activities = () => {
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const userRole =  user ? user.user.role : null;
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch('http://localhost:3000/activities');
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const data = await response.json();
                setActivities(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }

        }
  
        fetchActivities();
    }
    , [activities]);

    const handleUserClick = () => {
        console.log('User clicked');
    }

    // redirct the guest to the sign in page
    const handleGuestClick = () => {
        navigate('/signIn');
    }

    const handleAddClick = () => {
        setIsAddModalOpen(true);
    }

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    }

    const handleAddActivity = (activityData) => {
        console.log(activityData);
        try {
            fetch('http://localhost:3000/activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(activityData)
            });
        }
        catch (error) {
            console.error('Failed to add activity', error);
        }
    }

    const errorReload = () => {
        setError(null);
        setLoading(true);
    }

    return ( <>
        {loading && <Loading />}
        {error && <Error error={error} reload={errorReload} />}
        <Box display="flex" flexDirection="column" alignItems="center" width="100%" backgroundColor="#eedbc4">
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
            btnClick={() => user ? handleUserClick(activity._id) : handleGuestClick()}
            show={userRole === 'admin' ? 'block' : 'none'}
          />
        ))}
        </Box>
         {/* Render Add Activity Modal */}
        <AddActivityModal open={isAddModalOpen} handleClose={handleCloseAddModal} handleAdd={handleAddActivity} />
    </> );
}
 
export default Activities;