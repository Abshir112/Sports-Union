import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import Error from "../components/Error";
import AddEventModal from "../components/AddEventModal"; // Assuming you have a similar component for adding events
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';
import useReserveEvent from "../hooks/useReserveEvent"; // Assuming you have similar hooks for events
import useAddEvent from "../hooks/useAddEvent";

function EventCardsList() {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const userRole = user ? user.user.role : null;
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { reserveEvent, reserveError, isLoading, unReserveEvent } = useReserveEvent(); // Assuming similar functionality for event reservation
    const { addEvent, addingEventError, addingEventIsLoading } = useAddEvent(); // Assuming similar functionality for adding events

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:3000/events');
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const data = await response.json();
                setEvents(data);
                setError(null);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const handleReserve = async (eventId) => {
        if (!user) {
            navigate('/signin');
            return;
        }
        await reserveEvent(eventId);
    }

    const handleUnReserve = async (eventId) => {
        await unReserveEvent(eventId);
    }

    const handleAddClick = () => {
        setIsAddModalOpen(true);
    }

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    }

    const handleAddEvent = (eventData) => {
        addEvent(eventData);
    }

    const errorReload = () => {
        setError(null);
        setLoading(true);
    }

    return (
        <>
            {loading && <Loading />}
            {error && <Error error={error} reload={errorReload} />}
            {reserveError && <Error error={reserveError} />}
            {isLoading && <Loading />}
            {addingEventError && <Error error={addingEventError} />}
            {addingEventIsLoading && <Loading />}
            <Box display="flex" flexDirection="column" alignItems="center" width="100%" backgroundColor="#eedbc4">
                {userRole === 'admin' && (
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ margin: '1em' }}
                        onClick={handleAddClick}
                    >
                        Add Event
                    </Button>
                )}
                {events.map(event => (
                    <EventCard
                        key={event._id}
                        id={event._id}
                        date={event.date}
                        title={event.title}
                        time={event.time}
                        location={event.location}
                        description={event.description}
                        maxParticipants={event.maxParticipants}
                        image={`../../assets/${event.title}.JPG`}
                        handleReserve={() => handleReserve(event._id)}
                        handleUnreserve={() => handleUnReserve(event._id)}
                        show={userRole === 'admin' ? 'block' : 'none'}
                        // Assuming you have a function to check reservation status
                    />
                ))}
            </Box>
            {/* Render Add Event Modal */}
            <AddEventModal open={isAddModalOpen} handleClose={handleCloseAddModal} handleAdd={handleAddEvent} />
        </>
    );
}

export default EventCardsList;
