import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useReserveEvent = () => {
    const { user } = useAuthContext();
    const [reserveError, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { userEvents, events, dispatch } = useAuthContext(); // Added `events`

    const reserveEvent = async (eventID) => {
        const updatedEvents = events.map(event => { // Updated logic to update events
            if (event._id === eventID) {
                return {
                    ...event,
                    currentParticipants: event.currentParticipants + 1,
                    availableSpots: event.availableSpots - 1
                };
            }
            return event;
        });

        fetch('/api/v1/users-events/user-event', {
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
                localStorage.setItem('events', JSON.stringify(updatedEvents)); // Added this line to update localStorage
                dispatch({ type: 'UPDATE_EVENTS', payload: updatedEvents }); // Added this line to update events state
                setError(null);
                //setIsLoading(false); // Moved this line here
            })
            .catch(error => {
                setIsLoading(false);
                setError(error.message);
            });
    }

    const unReserveEvent = async (eventID) => {
        const updatedEvents = events.map(event => { // Updated logic to update events
            if (event._id === eventID) {
                return {
                    ...event,
                    currentParticipants: event.currentParticipants - 1,
                    availableSpots: event.availableSpots + 1
                };
            }
            return event;
        });

        fetch(`/api/v1/users-events`, {
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
                // Dispatch action to remove the unreserved event from userEvents
                dispatch({ type: 'REMOVE_USER_EVENT', payload: eventID });
                localStorage.setItem('userEvents', JSON.stringify(userEvents.filter(event => event.eventId !== eventID)));
                localStorage.setItem('events', JSON.stringify(updatedEvents)); // Added this line to update localStorage
                dispatch({ type: 'UPDATE_EVENTS', payload: updatedEvents }); // Added this line to update events state
                setError(null);
            })
            .catch(error => {
                setError(error.message);
            });
    }

    return { reserveEvent, unReserveEvent, reserveError, isLoading };
}

export default useReserveEvent;
