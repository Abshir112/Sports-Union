import React from "react";
import { Box } from "@mui/material";
import EventCard from "../components/EventCard";
import { useState, useEffect} from "react";

function EventCardsList() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
       const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:3000/events/get-events');
            const data = await response.json();
            setEvents(data);
        }
        catch (error) {
            console.error(error);
        }
         };
        fetchEvents();

           
        }, []);

   

    return (
      <Box display="flex" flexDirection="column" alignItems="center" width="100%" backgroundColor="#eedbc4">
        {events.map(event => (
          <EventCard
            key={event.title}
            title={event.title}
            date={event.date}
            time={event.time}
            location={event.location}
            description={event.description}
            image={event.image} 
          />
        ))}
      </Box>
    );
}

export default EventCardsList;
