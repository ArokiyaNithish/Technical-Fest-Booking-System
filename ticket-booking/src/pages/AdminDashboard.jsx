import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { isAdmin, logout } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (!isAdmin) {
            navigate('/login');
            return;
        }

        const fetchBookings = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5001/api/bookings');
                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }
                const data = await response.json();
                console.log('Bookings data received:', data);
                if (Array.isArray(data)) {
                    setBookings(data);
                } else {
                    console.error('Expected an array but received:', data);
                    setBookings([]);
                }
            } catch (err) {
                console.error('Error fetching bookings:', err.message);
            }
        };

        fetchBookings();
    }, [isAdmin, navigate]);

    return (
        <div className="page-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'Anton', fontSize: '2.5rem', textTransform: 'uppercase', color: 'white' }}>Admin Dashboard</h2>
                <button className="btn-secondary" onClick={logout} style={{ marginTop: 0 }}>Logout</button>
            </div>

            {bookings.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                    <h3>No bookings records found.</h3>
                </div>
            ) : (
                <div className="card" style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                        <thead>
                            <tr style={{ background: 'rgba(211, 47, 47, 0.2)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem', borderBottom: '2px solid #d32f2f' }}>Time</th>
                                <th style={{ padding: '1rem', borderBottom: '2px solid #d32f2f' }}>Agent Name</th>
                                <th style={{ padding: '1rem', borderBottom: '2px solid #d32f2f' }}>Mission</th>
                                <th style={{ padding: '1rem', borderBottom: '2px solid #d32f2f' }}>Tickets</th>
                                <th style={{ padding: '1rem', borderBottom: '2px solid #d32f2f' }}>Total</th>
                                <th style={{ padding: '1rem', borderBottom: '2px solid #d32f2f' }}>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #333' }}>
                                    <td style={{ padding: '1rem' }}>{new Date(booking.BookingDate).toLocaleString()}</td>
                                    <td style={{ padding: '1rem' }}>{booking.UserName}<br /><span style={{ fontSize: '0.8rem', color: '#888' }}>{booking.Email}</span></td>
                                    <td style={{ padding: '1rem' }}>{booking.EventName}</td>
                                    <td style={{ padding: '1rem' }}>{booking.NumTickets}</td>
                                    <td style={{ padding: '1rem' }}>₹{booking.TotalAmount}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontSize: '0.9rem' }}>
                                            Dept: {booking.Dept}<br />
                                            College: {booking.College}<br />
                                            Phone: {booking.Phone}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
