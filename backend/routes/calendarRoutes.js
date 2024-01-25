const express = require("express");
const calendarController = require("../controllers/calendarController");

const router = express.Router();

router.get("/calendars/:pageToken?", calendarController.getCalendars);
router.post("/calendar", calendarController.createCalendar);

module.exports = router;
