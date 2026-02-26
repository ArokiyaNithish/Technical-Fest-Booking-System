import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/events');
                if (!response.ok) throw new Error('Failed to fetch events');
                const data = await response.json();
                setEvents(data);
            } catch (err) {
                console.error('Error fetching events:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading) return <div className="page-container" style={{ color: 'white', textAlign: 'center' }}>Loading events...</div>;

    return (
        <div className="page-container">
            <h2 style={{ fontFamily: 'Anton', fontSize: '3rem', textAlign: 'center', marginBottom: '2rem', textTransform: 'uppercase', color: 'white', textShadow: '2px 2px #007bff' }}>Technical Fest Events</h2>
            <div className="events-grid">
                {events.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default Events;
