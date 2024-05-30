import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";


const useReserveActivity = () => {
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const [reserveError, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { userActivities, activities, dispatch } = useAuthContext();

    const reserveActivity = async (activityID) => {
        const updatedActivities = activities.map(activity => {
            if (activity._id === activityID) {
                return {
                    ...activity,
                    currentParticipants: activity.currentParticipants + 1,
                    availableSpots: activity.availableSpots - 1
                };
            }
            return activity;
        });
        fetch('/api/v1/users-activities/user-activity', {
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
            if (response.status === 401) {
                dispatch({ type: 'LOGOUT' });
                localStorage.removeItem('userActivities');
                localStorage.removeItem('activities');
                localStorage.removeItem('userEvents');
                localStorage.removeItem('events');
                localStorage.removeItem('user');
                navigate('/');
                return;
            }
            if (!response.ok) {
                throw new Error('Failed to reserve activity');
            }
            return response.json();
        })
        .then((data) => {
            // Dispatch action to update userActivities
            localStorage.setItem('userActivities', JSON.stringify([...userActivities, data]));
            dispatch({ type: 'ADD_USER_ACTIVITY', payload: data });
            localStorage.setItem('activities', JSON.stringify(updatedActivities));
            dispatch({ type: 'UPDATE_ACTIVITIES', payload: updatedActivities });
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
        const updatedActivities = activities.map(activity => {
            if (activity._id === activityID) {
                return {
                    ...activity,
                    currentParticipants: activity.currentParticipants - 1,
                    availableSpots: activity.availableSpots + 1
                };
            }
            return activity;
        });
        fetch(`/api/v1/users-activities`, {
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
            localStorage.setItem('activities', JSON.stringify(updatedActivities));
            dispatch({ type: 'UPDATE_ACTIVITIES', payload: updatedActivities });
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
    
