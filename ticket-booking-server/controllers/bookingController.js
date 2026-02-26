const { getPool, sql } = require('../db/config');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public (Admin)
const getBookings = async (req, res) => {
    try {
        const pool = getPool();
        const result = await pool.request().query('SELECT * FROM Bookings ORDER BY BookingDate DESC');
        res.json(result.recordset);
    } catch (err) {
        console.error('GET /api/bookings error:', err.message);
        res.status(500).json({ error: err.message });
    }
};

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
    let transaction;
    try {
        const { name, email, phone, college, dept, year, eventName, numTickets, totalAmount } = req.body;
        const pool = getPool();

        // Start transaction
        transaction = new sql.Transaction(pool);
        await transaction.begin();

        // 1. Check current availability
        const eventResult = await transaction.request()
            .input('eventName', sql.NVarChar, eventName)
            .query('SELECT AvailableTickets FROM Events WHERE Name = @eventName');

        if (eventResult.recordset.length === 0) {
            throw new Error('Event not found');
        }

        const available = eventResult.recordset[0].AvailableTickets;
        if (available < numTickets) {
            throw new Error(`Only ${available} tickets available`);
        }

        // 2. Reduce available tickets
        await transaction.request()
            .input('eventName', sql.NVarChar, eventName)
            .input('numTickets', sql.Int, numTickets)
            .query('UPDATE Events SET AvailableTickets = AvailableTickets - @numTickets WHERE Name = @eventName');

        // 3. Insert booking record
        await transaction.request()
            .input('name', sql.NVarChar, name)
            .input('email', sql.NVarChar, email)
            .input('phone', sql.NVarChar, phone)
            .input('college', sql.NVarChar, college)
            .input('dept', sql.NVarChar, dept)
            .input('year', sql.NVarChar, year)
            .input('eventName', sql.NVarChar, eventName)
            .input('numTickets', sql.Int, numTickets)
            .input('totalAmount', sql.Int, totalAmount)
            .input('bookingDate', sql.DateTime, new Date())
            .query(`
                INSERT INTO Bookings (UserName, Email, Phone, College, Dept, Year, EventName, NumTickets, TotalAmount, BookingDate)
                VALUES (@name, @email, @phone, @college, @dept, @year, @eventName, @numTickets, @totalAmount, @bookingDate)
            `);

        // Commit transaction
        await transaction.commit();

        res.status(201).json({ message: 'Booking created successfully' });
    } catch (err) {
        if (transaction) await transaction.rollback();
        console.error('POST /api/bookings error:', err.message);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getBookings, createBooking };
