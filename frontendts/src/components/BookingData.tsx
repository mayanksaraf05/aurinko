import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookingData.css";

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
        const response = await axios.get(
          "http://localhost:3004/booking/getAllBookingList"
        );
        const data: BookingData[] = response.data;

        setBookingData(data);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="booking-container">
      {bookingData ? (
        <table className="booking-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Availability Step</th>
              <th>Duration</th>
              <th>Time Available For</th>
              <th>Subject</th>
              <th>Description</th>
              <th>Location</th>
              <th>Timezone</th>
              <th>Created At</th>
              <th>Day of Week</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {bookingData.map((booking, index) =>
              booking.workHours.daySchedules.map((daySchedule, dayIndex) => (
                <tr key={`${index}-${dayIndex}`}>
                  <td>{booking._id?.slice(0,10)}</td>
                  <td>{booking.name}</td>
                  <td>{booking.availabilityStep}</td>
                  <td>{booking.durationMinutes} minutes</td>
                  <td>{booking.timeAvailableFor}</td>
                  <td>{booking.subject}</td>
                  <td>{booking.description}</td>
                  <td>{booking.location}</td>
                  <td>{booking.workHours.timezone}</td>
                  <td>{new Date(booking.createdAt).toLocaleString()}</td>
                  <td>{daySchedule.dayOfWeek}</td>
                  <td>{daySchedule.workingIntervals[0].start}</td>
                  <td>{daySchedule.workingIntervals[0].end}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      ) : (
        <p>Loading booking data...</p>
      )}
    </div>
  );
};

export default BookingDetails;
