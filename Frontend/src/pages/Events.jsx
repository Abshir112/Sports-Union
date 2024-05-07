import React from "react";
import { Box } from "@mui/material";
import EventCard from "../components/EventCard";

function EventCardsList() {
    // Sample data
    const events = [
      {
        title: "Volley Ball",
        date: "2024-08-16 08:00 PM",
        location: "HKR Campus",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, quasi. Unde nobis tempora dicta quod neque doloremque modi, corrupti aspernatur, architecto facere, nemo laborum ab earum nihil assumenda temporibus facilis!",        image: "../../assets/even1.JPG" 
      },
      {
        title: "Badminton",
        date: "2024-08-11 08:00 PM",
        location: "HKR Campus",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, quasi. Unde nobis tempora dicta quod neque doloremque modi, corrupti aspernatur, architecto facere, nemo laborum ab earum nihil assumenda temporibus facilis!",
        image: "../../assets/medlems.JPG" 
      }
    ];

    return (
      <Box display="flex" flexDirection="column" alignItems="center" width="100%" backgroundColor="#eedbc4">
        {events.map(event => (
          <EventCard
            key={event.title}
            date={event.date}
            title={event.title}
            location={event.location}
            description={event.description}
            image={event.image} 
          />
        ))}
      </Box>
    );
}

export default EventCardsList;
