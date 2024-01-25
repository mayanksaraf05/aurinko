import React, { useState } from "react";
import { useForm, SubmitHandler, Path } from "react-hook-form";
import "./BookingForm.css";
import axios from "axios";
import BookingDetails from "./BookingData";

interface MyFormData {
  name: string;
  availabilityStep: number;
  durationMinutes: number;
  timeAvailableFor: string;
  timeAvailableForYears: 1;
  timeAvailableForMonths: 1;
  timeAvailableForDays: 1;
  subject: string;
  description: string;
  location: string;
  workHours: {
    daySchedules: {
      dayOfWeek: string;
      workingIntervals: {
        start: number | "12:00:22Z";
        end: number | "12:00:22Z";
      }[];
    }[];
    timezone: string;
  };
  context: string;
  startConference: boolean;
}

interface ChildComponentProps {
  showBookingForm: boolean;
  setShowBookingForm: (newMessage: boolean) => void;
}

const BookingForm: React.FC<ChildComponentProps> = ({
  showBookingForm,
  setShowBookingForm,
}) => {
  const { register, handleSubmit } = useForm<MyFormData>();

  const [formattedStartTime, setFormattedStartTime] =
    useState<string>("12:00:22Z");
  const [formattedEndTime, setFormattedEndTime] = useState<string>("12:00:22Z");

  const onSubmit: SubmitHandler<MyFormData> = async (data: any) => {
    const {
      timeAvailableForYears,
      timeAvailableForMonths,
      timeAvailableForDays,
      ...restData
    } = data;

    // convert  "timeAvailableFor" in Java's Period A date-based amount of time in the ISO-8601 calendar system, such as '2 years, 3 months and 4 days Ex: P2Y3M4D'.
    const timeAvailableFor = `P${
      timeAvailableForYears >= 0 ? timeAvailableForYears + "Y" : "0Y"
    }${timeAvailableForMonths >= 0 ? timeAvailableForMonths + "M" : "0M"}${
      timeAvailableForDays >= 0 ? timeAvailableForDays + "D" : "0D"
    }`;

    // create booking form and save information to database
    axios
      .post("http://localhost:3004/booking/createBooking", {
        formData: {
          ...restData,
          timeAvailableFor,
          workHours: {
            ...restData.workHours,
            daySchedules: [
              {
                ...restData.workHours.daySchedules[0],
                workingIntervals: [
                  {
                    ...restData.workHours.daySchedules[0].workingIntervals[0],
                    start: formattedStartTime,
                    end: formattedEndTime,
                  },
                ],
              },
            ],
          },
          context: data.context,
          startConference: data.startConference,
          availabilityStep: parseInt(restData.availabilityStep),
          durationMinutes: parseInt(restData.durationMinutes),
        },
        token: `${localStorage.getItem("accessToken")}`,
      })
      .then((res) => {
        alert("submitted sucessfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {!showBookingForm && <BookingDetails />}

      {!!showBookingForm && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Booking Form</h3>
          <div>
            <label htmlFor="name">Name</label>
            <input {...register("name")} type="text" />
          </div>

          <div>
            <label htmlFor="availabilityStep">Availability Step</label>
            <input {...register("availabilityStep")} type="number" />
          </div>

          <div>
            <label htmlFor="durationMinutes">Duration (Minutes)</label>
            <input {...register("durationMinutes")} type="number" />
          </div>

          <div>
            <label htmlFor="timeAvailableFor">Time Available For</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <select {...register("timeAvailableForYears")} defaultValue="">
                <option value="timeAvailableForYears" disabled>
                  Select years
                </option>
                {Array.from({ length: 10 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1} years
                  </option>
                ))}
              </select>

              <select {...register("timeAvailableForMonths")} defaultValue="">
                <option value="timeAvailableForMonths" disabled>
                  Select months
                </option>
                {Array.from({ length: 12 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1} months
                  </option>
                ))}
              </select>

              <select {...register("timeAvailableForDays")} defaultValue="">
                <option value="timeAvailableForDays" disabled>
                  Select days
                </option>
                {Array.from({ length: 31 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1} days
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="subject">Subject</label>
            <input {...register("subject")} type="text" />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea rows={5} cols={45} {...register("description")} />
          </div>

          <div>
            <label htmlFor="location">Location</label>
            <input {...register("location")} type="text" />
          </div>
          <div>
            <div>
              <label htmlFor="workHours.daySchedules[0].dayOfWeek">
                Day of Week
              </label>
              <select
                {...register(
                  "workHours.daySchedules[0].dayOfWeek" as Path<MyFormData>
                )}
                defaultValue="workHours.daySchedules[0].dayOfWeek"
              >
                <option value="" disabled>
                  Select day of week
                </option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
              </select>
            </div>
            <input
              {...register(
                "workHours.daySchedules[0].workingIntervals[0].start" as Path<MyFormData>
              )}
              type="time"
              placeholder="Start Time"
              value={formattedStartTime.slice(0, -4)}
              onChange={(e) => {
                const inputValue = e.target.value;
                const formattedValue = `${inputValue}:22Z`;
                setFormattedStartTime(formattedValue);
              }}
            />
            <input
              {...register(
                "workHours.daySchedules[0].workingIntervals[0].end" as Path<MyFormData>
              )}
              type="time"
              placeholder="End Time"
              value={formattedEndTime.slice(0, -4)}
              onChange={(e) => {
                const inputValue = e.target.value;
                const formattedValue = `${inputValue}:22Z`;
                setFormattedEndTime(formattedValue);
              }}
            />
          </div>

          <div>
            <label htmlFor="workHours.timezone">Timezone</label>
            <input {...register("workHours.timezone")} type="text" />
          </div>

          <div>
            <label htmlFor="context">Context</label>
            <input {...register("context")} type="text" />
          </div>

          <div style={{ display: "flex", fontSize: "12px" }}>
            <input
              style={{ width: "20px" }}
              {...register("startConference")}
              type="checkbox"
            />
            <span style={{ fontSize: "15px" }}>Start Conference</span>
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
