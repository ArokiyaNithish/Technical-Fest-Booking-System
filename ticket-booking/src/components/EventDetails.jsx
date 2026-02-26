import React from 'react';

const EventDetails = ({ event }) => {
    return (
        <div className="event-details card">
            <h2>Event Details</h2>
            <div className="details-list">
                <p><strong>Event Name:</strong> {event.name}</p>
                <p><strong>Department:</strong> {event.department}</p>
                <div style={{ margin: '1.5rem 0', borderTop: '1px solid #333', borderBottom: '1px solid #333', padding: '1rem 0' }}>
                    <h4 style={{ color: '#007bff', margin: '0 0 0.5rem 0' }}>Description:</h4>
                    <p style={{ margin: '0', fontSize: '1rem', color: '#eee' }}>{event.details}</p>
                </div>
                <p><strong>Date & Time:</strong> {event.dateTime}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
                <p><strong>Ticket Price:</strong> ₹{event.price}</p>
                <p className="highlight"><strong>Available Tickets:</strong> {event.available}</p>

                <div style={{ marginTop: '1.5rem', background: '#1a1a1a', padding: '1rem', borderRadius: '4px', borderLeft: '3px solid #007bff' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: 'white' }}>Event Coordinator</h4>
                    <p style={{ margin: '0.2rem 0' }}><strong>Name:</strong> {event.coordinator}</p>
                    <p style={{ margin: '0.2rem 0' }}><strong>Contact:</strong> {event.phone}</p>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
