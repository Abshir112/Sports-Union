import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useReserveEvent = () => {
    const { user } = useAuthContext();
    const [reserveError, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { userEvents, dispatch } = useAuthContext();

    const reserveEvent = async (eventID) => {
        setIsLoading(true);
        fetch('https://sports-union.onrender.com/users-events/user-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                userId: user.user._id,
                eventId: eventID
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to reserve event');
                }
                return response.json();
            })
            .then((data) => {
                // Dispatch action to update userEvents
                localStorage.setItem('userEvents', JSON.stringify([...userEvents, data]));
                dispatch({ type: 'ADD_USER_EVENT', payload: data });
                setIsLoading(false);
                setError(null);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error.message);
            });
    }

    const unReserveEvent = async (eventID) => {
        console.log('Unreserving event...');
        fetch(`https://sports-union.onrender.com/users-events`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                userId: user.user._id,
                eventId: eventID
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to unreserve event');
                }
                dispatch({ type: 'REMOVE_USER_EVENT', payload: eventID });
                localStorage.setItem('userEvents', JSON.stringify(userEvents.filter(event => event.eventId !== eventID)));
                setError(null);

                // reload the page
                //window.location.reload();

            })
            .catch(error => {
                setError(error.message);
            });
               
    }
    return { reserveEvent, unReserveEvent, reserveError, isLoading };
}

export default useReserveEvent;
