import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

const useAddEvent = () => {
    const navigate = useNavigate();
    const [addingEventError, setError] = useState(null);
    const [addingEventIsLoading, setIsLoading] = useState(false);
    const { user, dispatch } = useAuthContext();

    const addEvent = async (eventData) => {
        setIsLoading(true);
        const requestData = { ...eventData, currentParticipants: 0, }; // Assuming event data structure is similar to activities
        try {
            const response = await fetch('/api/v1/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    ...requestData,
                    availableSpots: requestData.maxParticipants
                })
            });
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
                throw new Error('Failed to add event');
            }
            const data = await response.json();
            console.log(data);
            // Handle successful addition of event, e.g., show a message or update state
            setError(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
            // Consider redirecting or updating the UI without a full page reload
        }
    };

    return { addEvent, addingEventError, addingEventIsLoading };
}

export default useAddEvent;
