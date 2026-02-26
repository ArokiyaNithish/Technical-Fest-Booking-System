import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import BookingSummary from '../components/BookingSummary';
import EventDetails from '../components/EventDetails';

const BookingPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchEvent = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/events');
            if (!response.ok) throw new Error('Failed to fetch events');
            const data = await response.json();
            const foundEvent = data.find(e => e.id === parseInt(id));
            setEvent(foundEvent);
        } catch (err) {
            console.error('Error fetching event:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvent();
    }, [id]);

    if (loading) return <div className="page-container" style={{ color: 'white', textAlign: 'center' }}>Loading event details...</div>;

    if (!event) {
        return <div className="page-container"><h2>Event Not Found</h2></div>;
    }

    const handleBook = async (details) => {
        const tickets = parseInt(details.numTickets, 10);
        const totalAmount = tickets * event.price;

        const bookingData = {
            name: details.name,
            email: details.email,
            phone: details.phone,
            college: details.college,
            dept: details.dept,
            year: details.year,
            eventName: event.name,
            numTickets: tickets,
            totalAmount: totalAmount
        };

        try {
            const response = await fetch('http://localhost:5001/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create booking');
            }

            // Refresh event data from server to get latest available tickets
            await fetchEvent();

            setBooking({
                userName: details.name,
                eventName: event.name,
                ticketsBooked: tickets,
                totalAmount: totalAmount,
            });

            console.log('Booking successful!');
        } catch (err) {
            console.error('Booking failed:', err.message);
            alert(`Error: ${err.message}. Please ensure the backend server and database are running.`);
        }
    };

    return (
        <div className="page-container">
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '3rem', fontFamily: 'Anton', fontSize: '3rem', color: '#007bff' }}>
                    TICKET BOOKING SYSTEM
                </h1>

                <div style={{ display: 'grid', gridTemplateColumns: booking ? '1fr' : '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                    {!booking && <EventDetails event={event} />}

                    <div className="interaction-panel">
                        {booking ? (
                            <BookingSummary
                                bookingDetails={booking}
                                onReset={() => setBooking(null)}
                                event={event}
                            />
                        ) : (
                            <BookingForm event={event} onBook={handleBook} />
                        )}
                    </div>
                </div>

                {!booking && (
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <Link to="/events" className="btn-secondary" style={{ padding: '0.8rem 2rem', display: 'inline-block' }}>
                            Back to All Events
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingPage;
