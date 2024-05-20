import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


const useReserveActivity = () => {
    const {user} = useAuthContext();
    const [reserveError, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { userActivities, dispatch } = useAuthContext();

    const reserveActivity = async (activityID) => {
        setIsLoading(true);
        fetch('https://sports-union.onrender.com/api/v1/users-activities/user-activity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                userId: user.user._id,
                activityId: activityID
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to reserve activity');
            }
            return response.json();
        })
        .then((data) => {
            // Dispatch action to update userActivities
            localStorage.setItem('userActivities', JSON.stringify([...userActivities, data]));
            dispatch({ type: 'ADD_USER_ACTIVITY', payload: data });
            setIsLoading(false);
            setError(null);
            // reload the page
            //window.location.reload();
        })
        .catch(error => {
            setIsLoading(false);
            setError(error.message);
        });
    }

    const unReserveActivity = async (activityID) => {
        fetch(`https://sports-union.onrender.com/api/v1/users-activities`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                userId: user.user._id,
                activityId: activityID
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to unreserve activity');
            }
            // Dispatch action to remove the unreserved activity from userActivities
            dispatch({ type: 'REMOVE_USER_ACTIVITY', payload: activityID });
            localStorage.setItem('userActivities', JSON.stringify(userActivities.filter(activity => activity.activityId !== activityID)));
            setError(null);
            // reload the page
            //window.location.reload();
        })
        .catch(error => {
            setError(error.message);
        });
    } 

    return { reserveActivity, unReserveActivity, reserveError, isLoading };
}

export default useReserveActivity;
    
