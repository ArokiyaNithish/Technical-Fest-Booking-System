const express = require('express');
const router = express.Router();
const { getBookings, createBooking } = require('../controllers/bookingController');
const { getEvents } = require('../controllers/eventController');

router.get('/list', getBookings);
router.post('/', createBooking);
router.get('/events', getEvents);

module.exports = router;
