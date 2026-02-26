import React from 'react';

const BookingSummary = ({ bookingDetails, onReset, event }) => {
    return (
        <div className="booking-summary card" style={{ textAlign: 'center' }}>
            <div className="success-icon" style={{ fontSize: '3rem', color: '#28a745', marginBottom: '1rem' }}>✓</div>
            <h3 style={{ color: '#28a745' }}>Booking Confirmed!</h3>
            <p style={{ marginBottom: '1.5rem' }}>Your tickets for <strong>{event.name}</strong> have been booked successfully.</p>

            <div className="summary-details" style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', textAlign: 'left', border: '1px solid #333' }}>
                <p><strong>Member Name:</strong> {bookingDetails.userName}</p>
                <p><strong>Event Name:</strong> {bookingDetails.eventName}</p>
                <p><strong>Department:</strong> {event.department}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
                <p><strong>Date & Time:</strong> {event.dateTime}</p>
                <p><strong>Tickets Booked:</strong> {bookingDetails.ticketsBooked}</p>
                <hr style={{ border: 'none', borderTop: '1px solid #444', margin: '1rem 0' }} />
                <p className="total-amount" style={{ fontSize: '1.2rem', color: '#007bff' }}><strong>Total Amount:</strong> ₹{bookingDetails.totalAmount}</p>
            </div>

            <button className="btn-secondary" onClick={onReset} style={{ marginTop: '2rem', width: '100%' }}>Book Another Event</button>
        </div>
    );
};

export default BookingSummary;
