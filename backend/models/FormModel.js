const mongoose = require("mongoose");

const workingIntervalSchema = new mongoose.Schema({
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

const dayScheduleSchema = new mongoose.Schema({
  dayOfWeek: {
    type: String,
    required: true,
  },
  workingIntervals: [workingIntervalSchema],
});

const bookingSchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: true,
  },
  availabilityStep: {
    type: Number,
    required: true,
  },
  durationMinutes: {
    type: Number,
    required: true,
  },
  timeAvailableFor: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  workHours: {
    daySchedules: [dayScheduleSchema],
    timezone: {
      type: String,
      required: true,
    },
  },
}, {
  timestamps: true,
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
