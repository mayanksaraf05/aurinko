const express = require("express");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

router.post("/createBooking", bookingController.createBooking);
router.get("/getAllBookingList", bookingController.getAllBookingList);

module.exports = router;
