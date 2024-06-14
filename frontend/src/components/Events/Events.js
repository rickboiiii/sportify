// src/components/Events.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from "@/components/Events/EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/eventi/');
        console.log(response);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <ul>
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </ul>
    </div>
  );
};

export default Events;
