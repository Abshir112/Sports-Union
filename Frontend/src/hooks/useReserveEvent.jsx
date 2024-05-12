import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useReserveEvent = () => {
    const { user } = useAuthContext();
    const [reserveError, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { userEvents, dispatch } = useAuthContext();

    const reserveEvent = async (eventId) => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3000/users-events/user-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    userId: user.user._id,
                    eventId: eventId
                })
            });
            if (!response.ok) {
                throw new Error('Failed to reserve event');
            }
            const data = await response.json();
            dispatch({ type: 'SET_USER_EVENTS', payload: [...userEvents, data] });
            setIsLoading(false);
            setError(null);
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    }

    const unReserveEvent = async (eventId) => {
        try {
            const response = await fetch(`http://localhost:3000/users-events/user-event`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    userId: user.user._id,
                    eventId: eventId
                })
            });
            if (!response.ok) {
                throw new Error('Failed to unreserve event');
            }
            dispatch({ type: 'REMOVE_USER_EVENT', payload: eventId });
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    }

    return { reserveEvent, unReserveEvent, reserveError, isLoading };
}

export default useReserveEvent;
