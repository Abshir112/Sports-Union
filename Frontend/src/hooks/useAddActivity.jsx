import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';


const useAddActivity = () => {
    const navigate = useNavigate();
    const [addingActivityError, setError] = useState(null);
    const [addingActivityIsLoading, setIsLoading] = useState(null);
    const { user, dispatch } = useAuthContext();

    const addActivity = (activityData) => {
        try {
            setIsLoading(true);
            const requestData = { ...activityData, currentParticipants: 0 };
            fetch('/api/v1/activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    ...requestData,
                    availableSpots: requestData.maxParticipants
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
                    throw new Error('Failed to add activity');
                }
                setIsLoading(false);
                setError(null);
                // Handle successful addition of activity (if needed)
                return response.json();
            })
            .then(_ => {
                window.location.reload();
            })

        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
        finally {
            setIsLoading(false);
        }
    }

    return { addActivity, addingActivityError, addingActivityIsLoading };
}


export default useAddActivity;