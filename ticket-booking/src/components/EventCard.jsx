import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="event-card" style={{ position: 'relative', overflow: 'hidden', borderLeft: '4px solid #007bff' }}>
            <h3 style={{ color: '#007bff' }}>{event.name}</h3>
            <p><strong>Department:</strong> {event.department}</p>
            <p><strong>Date:</strong> {event.dateTime}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Ticket Price:</strong> ₹{event.price}</p>
            <p style={{ margin: '1rem 0', color: '#ccc', fontSize: '0.9rem' }}>{event.description}</p>

            <p className="highlight" style={{ fontSize: '1rem', color: event.available > 0 ? '#28a745' : '#ff4444' }}>
                <strong>Available:</strong> {event.available}
            </p>

            {showDetails && (
                <div style={{
                    background: 'rgba(0,0,0,0.5)',
                    padding: '1rem',
                    margin: '1rem 0',
                    borderLeft: '2px solid #007bff',
                    animation: 'fadeIn 0.3s ease-in',
                    borderRadius: '4px'
                }}>
                    <h4 style={{ color: '#007bff', marginTop: 0 }}>Event Highlights:</h4>
                    <p style={{ fontSize: '0.85rem', color: '#eee' }}>{event.details}</p>
                </div>
            )}

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                <button
                    className="btn-secondary"
                    onClick={() => setShowDetails(!showDetails)}
                    style={{ marginTop: 0, flex: 1, padding: '0.6rem', fontSize: '0.9rem' }}
                >
                    {showDetails ? 'Less Info' : 'More Info'}
                </button>

                {event.available > 0 ? (
                    <Link to={`/book/${event.id}`} style={{ flex: 1, textDecoration: 'none' }}>
                        <button className="btn-primary" style={{ width: '100%', padding: '0.6rem', fontSize: '0.9rem' }}>
                            Book Now
                        </button>
                    </Link>
                ) : (
                    <button className="btn-primary" style={{ flex: 1, padding: '0.6rem', fontSize: '0.9rem', background: '#444', cursor: 'not-allowed', boxShadow: 'none' }} disabled>
                        Sold Out
                    </button>
                )}
            </div>
        </div>
    );
};

export default EventCard;
