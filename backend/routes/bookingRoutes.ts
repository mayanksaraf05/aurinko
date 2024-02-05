const express = require('express');
const { createBooking, getAllBookingList } = require('../controllers/bookingController');

const router = express.Router();

router.post('/createBooking', createBooking);
router.get('/getAllBookingList', getAllBookingList);

module.exports = router;
