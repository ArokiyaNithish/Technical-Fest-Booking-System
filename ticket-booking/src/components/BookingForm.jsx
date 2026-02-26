import React, { useState } from 'react';

const BookingForm = ({ event, onBook }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        college: '',
        dept: '',
        year: '1',
        numTickets: 1,
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation: All fields mandatory
        if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() ||
            !formData.college.trim() || !formData.dept.trim() || !formData.numTickets) {
            setError('All input fields are mandatory');
            return;
        }

        // Validation: Email ID format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid Email ID format');
            return;
        }

        // Validation: Phone format
        if (formData.phone.length < 10) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        // Validation: Number of tickets should be a positive number
        const tickets = parseInt(formData.numTickets, 10);
        if (isNaN(tickets) || tickets <= 0) {
            setError('Number of tickets must be a positive number');
            return;
        }

        // Validation: Prevent booking more tickets than available
        if (tickets > event.available) {
            setError(`Cannot book more than available tickets (${event.available})`);
            return;
        }

        setError('');
        onBook(formData);
    };

    return (
        <form className="booking-form card" onSubmit={handleSubmit}>
            <h3>Book Your Tickets</h3>
            {error && <p className="error-message" style={{ color: '#ff4444', marginBottom: '1rem', fontWeight: 'bold' }}>{error}</p>}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" />
                </div>

                <div className="form-group">
                    <label>Email ID</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit Number" maxLength="10" />
                </div>

                <div className="form-group">
                    <label>College</label>
                    <input type="text" name="college" value={formData.college} onChange={handleChange} placeholder="College Name" />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                    <label>Department</label>
                    <input type="text" name="dept" value={formData.dept} onChange={handleChange} placeholder="Dept" />
                </div>

                <div className="form-group">
                    <label>Year</label>
                    <select name="year" value={formData.year} onChange={handleChange} style={{ width: '100%', padding: '1rem', background: '#000', color: 'white', border: '1px solid #444' }}>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label>Number of Tickets</label>
                <input type="number" name="numTickets" value={formData.numTickets} onChange={handleChange} min="1" />
            </div>

            <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: '#222', borderRadius: '4px', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>Available: <strong style={{ color: '#007bff' }}>{event.available}</strong></span>
                <span>Price: <strong>₹{event.price}</strong></span>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>Confirm Booking</button>
            <button type="button" className="btn-secondary" style={{ marginTop: '0.5rem', width: '100%', padding: '0.5rem' }} onClick={() => setFormData({ name: '', email: '', phone: '', college: '', dept: '', year: '1', numTickets: 1 })}>Reset</button>
        </form>
    );
};

export default BookingForm;
