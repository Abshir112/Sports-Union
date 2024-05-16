import { useAuthContext } from './useAuthContext';

const useFetchUserActivites = () => {
    const { dispatch } = useAuthContext();
    const fetchUserActivities = async (id, token) => {
        console.log('Fetching user activities...', id);
        try {
            const response = await fetch(`http://localhost:3000/users-activities/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
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