const { getPool, sql } = require('../db/config');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
    try {
        const pool = getPool();
        const result = await pool.request().query('SELECT * FROM Events');
        
        // Map database fields to frontend field names if necessary
        const events = result.recordset.map(row => ({
            id: row.Id,
            name: row.Name,
            department: row.Department,
            dateTime: row.DateTimeDisplay,
            venue: row.Venue,
            price: row.Price,
            available: row.AvailableTickets,
            description: row.Description,
            details: row.Details,
            coordinator: row.Coordinator,
            phone: row.Phone
        }));

        res.json(events);
    } catch (err) {
        console.error('GET /api/events error:', err.message);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getEvents };
