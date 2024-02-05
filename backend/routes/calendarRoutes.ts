import express from 'express';
import { createCalendar, getCalendars } from '../controllers/calendarController';


const router = express.Router();

router.get('/calendars/:pageToken?',getCalendars);
router.post('/calendar', createCalendar);

module.exports = router;

