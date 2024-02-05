import mongoose, { Document } from 'mongoose';

interface WorkingInterval {
  start: string;
  end: string;
}

interface DaySchedule {
  dayOfWeek: string;
  workingIntervals: WorkingInterval[];
}

interface Booking extends Document {
  id: number;
  name: string;
  availabilityStep: number;
  durationMinutes: number;
  timeAvailableFor: string;
  subject: string;
  description: string;
  location: string;
  workHours: {
    daySchedules: DaySchedule[];
    timezone: string;
  };
}

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

const bookingSchema = new mongoose.Schema<Booking>({
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

const BookingModel = mongoose.model<Booking>('Booking', bookingSchema);

export default BookingModel;
