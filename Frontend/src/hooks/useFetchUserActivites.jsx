import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

const useFetchUserActivites = () => {
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();
    const fetchUserActivities = async (id, token) => {
        console.log('Fetching user activities...', id);
        try {
            const response = await fetch(`/api/v1/users-activities/${id}`, {
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
            localStorage.setItem('userActivities', JSON.stringify(data));
            dispatch({ type: 'SET_USER_ACTIVITIES', payload: data });
        } catch (error) {
            console.error('Error fetching user activities:', error);
        }
    };

    return {fetchUserActivities} ;
    
}

export default useFetchUserActivites;