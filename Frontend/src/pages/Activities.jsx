import React, {useState, useEffect} from "react";
import { Box } from "@mui/material";
import EventCard from "../components/EventCard";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';


const Activities = () => {
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch('http://localhost:3000/activity');
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
    , []);

    const handleUserClick = () => {
        console.log('User clicked');
    }

    // redirct the guest to the sign in page
    const handleGuestClick = () => {
        navigate('/signIn');
    }
    

    return ( <>
        <Box display="flex" flexDirection="column" alignItems="center" width="100%" backgroundColor="#eedbc4">
        {activities.map(activity => (
          <EventCard
            key={activity.activityName}
            date={activity.scheduledTime}
            title={activity.activityName}
            location={activity.location}
            description={activity.description}
            image={`../../assets/${activity.activityName}.JPG`}
            btnClick={() => user ? handleUserClick : handleGuestClick} 
          />
        ))}
        </Box>
    </> );
}
 
export default Activities;