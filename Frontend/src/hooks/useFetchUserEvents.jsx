import { useAuthContext } from "./useAuthContext";

const useFetchUserEvents = () => {
    const { dispatch } = useAuthContext();
    const fetchUserEvents = async (id, token) => {
        console.log('Fetching user events...', id);
        try {
            const response = await fetch(`https://sports-union.onrender.com/users-events/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
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