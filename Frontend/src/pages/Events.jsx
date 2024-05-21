import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import Error from "../components/Error";
import AddEventModal from "../components/AddEventModal"; 
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';
import useReserveEvent from "../hooks/useReserveEvent"; 
import useAddEvent from "../hooks/useAddEvent";
import { useTheme } from "@mui/material";
import useFetchUserEvents from "../hooks/useFetchUserEvents";

const EventCardsList = () => {
    const { fetchUserEvents } = useFetchUserEvents(); 
    const theme = useTheme();
    const navigate = useNavigate();
    const { user, dispatch } = useAuthContext();
    const userRole = user ? user.user.role : null;
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { reserveEvent, reserveError, isLoading, unReserveEvent } = useReserveEvent();
    const { addEvent, addingEventError, addingEventIsLoading } = useAddEvent();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('https://sports-union.onrender.com/api/v1/events');
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const data = await response.json();
                setEvents(data);
                dispatch({ type: 'SET_EVENTS', payload: data }); // Dispatch to update events in context
                localStorage.setItem('events', JSON.stringify(data)); // Update events in localStorage
                setError(null);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchEvents();
    }, [dispatch]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) return;
        const fetchUserEventsWrapper = () => {
            fetchUserEvents(userData.user._id, userData.token);
        };
        fetchUserEventsWrapper();
        const intervalId = setInterval(fetchUserEventsWrapper, 5000); // Fetch every 5 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount

    }, [fetchUserEvents]);

    const handleReserve = async (eventID) => {
        if (!user) {
            navigate('/signin');
            return;
        }
        await reserveEvent(eventID); 
    };

    const handleUnReserve = async (eventID) => {
        if (!user) {
            navigate('/signin');
            return;
        }
        await unReserveEvent(eventID);
    };

    const handleAddClick = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleAddEvent = async (event) => {
        await addEvent(event);
    };

    const errorReload = () => {
        setError(null);
        setLoading(true);
    };

    const checkIfReserved = (eventID) => {
        const userEvents = JSON.parse(localStorage.getItem('userEvents'));
        if (!userEvents) return false;
        return userEvents.some(event => event.eventId === eventID);
    };

    return (
        <>
            {loading && <Loading />}
            {error && <Error error={error} reload={errorReload} />}
            {reserveError && <Error error={reserveError} />}
            {isLoading && <Loading />}
            {addingEventError && <Error error={addingEventError} />}
            {addingEventIsLoading && <Loading />}
            <Box display="flex" flexDirection="column" alignItems="center" width="100%" backgroundColor={theme.palette.background.paper}>
                {userRole === 'admin' && 
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ margin: '1em'}}
                        onClick={handleAddClick}
                    >
                        Add Event
                    </Button>
                }
                {events.map(event => (
                    <EventCard
                        cardType='events'
                        key={event._id}
                        id={event._id}
                        date={event.date}
                        time={event.time}
                        title={event.title}
                        location={event.location}
                        description={event.description}
                        image={event.image}
                        show={userRole === 'admin' ? 'block' : 'none'}
                        reserved={checkIfReserved(event._id)}
                        maxParticipants={event.maxParticipants}
                        handleReserve={() => handleReserve(event._id)}
                        handleUnreserve={() => handleUnReserve(event._id)}
                    />
                ))}
            </Box>
            <AddEventModal open={isAddModalOpen} handleClose={handleCloseAddModal} handleAdd={handleAddEvent} />
        </>
    );
}

export default EventCardsList;
