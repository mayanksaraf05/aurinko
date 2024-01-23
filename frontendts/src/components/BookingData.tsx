import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookingData.css'; 

interface WorkingInterval {
  start: string;
  end: string;
}

interface DaySchedule {
  dayOfWeek: string;
  workingIntervals: WorkingInterval[];
}

interface WorkHours {
  daySchedules: DaySchedule[];
  timezone: string;
  updatedAt: string;
}

interface BookingData {
    _id: string;
    id: number;
    name: string;
    availabilityStep: number;
    durationMinutes: number;
    timeAvailableFor: string;
    subject: string;
    description: string;
    location: string;
    workHours: WorkHours;
    createdAt: string;
}

const BookingDetails: React.FC = () => {
  const [bookingData, setBookingData] = useState<BookingData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3004/getAllBookingList');
        const data: BookingData[] = response.data;

        setBookingData(data);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="booking-container">
      {bookingData ? (
        bookingData.map((booking, index) => (
          <div key={index} className="booking-box">
            <h2>{booking.name}</h2>
            <p>ID: {booking._id}</p>
            <p>Availability Step: {booking.availabilityStep}</p>
            <p>Duration: {booking.durationMinutes} minutes</p>
            <p>Time Available For: {booking.timeAvailableFor}</p>
            <p>Subject: {booking.subject}</p>
            <p>Description: {booking.description}</p>
            <p>Location: {booking.location}</p>

            <h3>Work Hours:</h3>
            <p>Timezone: {booking.workHours.timezone}</p>
            <p>Created At: {new Date(booking.createdAt).toLocaleString()}</p>
            {/* <p>Updated At: {new Date(booking.workHours.updatedAt).toLocaleString()}</p> */}

            <h3>Day Schedules:</h3>
            {booking.workHours.daySchedules.map((daySchedule, dayIndex) => (
              <div key={dayIndex} className="day-schedule-box">
                <p>Day of Week: {daySchedule.dayOfWeek}</p>

                <h4>Working Intervals:</h4>
                {daySchedule.workingIntervals.map((interval, intervalIndex) => (
                  <p key={intervalIndex}>Start: {interval.start}, End: {interval.end}</p>
                ))}
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>Loading booking data...</p>
      )}
    </div>
  );
};

export default BookingDetails;
