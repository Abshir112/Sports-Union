import { useAuthContext } from "./useAuthContext";
import { useNavigate } from 'react-router-dom';

const useFetchUserEvents = () => {
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();
    const fetchUserEvents = async (id, token) => {
        console.log('Fetching user events...', id);
        try {
            const response = await fetch(`/api/v1/users-events/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
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
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            localStorage.setItem('userEvents', JSON.stringify(data));
            dispatch({ type: 'SET_USER_EVENTS', payload: data });
        } catch (error) {
            console.error('Error fetching user events:', error);
        }
    };

    return {fetchUserEvents} ;
    
}

export default useFetchUserEvents;