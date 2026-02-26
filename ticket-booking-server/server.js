const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bookingRoutes = require('./routes/bookingRoutes');
const { connectDB, getPool } = require('./db/config');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', bookingRoutes);

// Root Endpoint
app.get('/', (req, res) => {
    res.send('Ticket Booking API is running...');
});

// Status Endpoint
app.get('/api/status', (req, res) => {
    let dbStatus = 'disconnected';
    try {
        const pool = getPool();
        if (pool && pool.connected) {
            dbStatus = 'connected';
        }
    } catch (err) {
        dbStatus = 'disconnected';
    }

    res.json({
        status: 'online',
        databaseStatus: dbStatus,
        port: PORT,
        database: process.env.DB_DATABASE,
        server: process.env.DB_SERVER
    });
});

// Start server immediately, then connect to DB in background
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🔗 Test API at: http://localhost:${PORT}`);
    });

    // Connect to DB (don't await so the server stays alive)
    connectDB();
};

startServer();
