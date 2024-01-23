import React, { useState } from 'react';
import { useForm, SubmitHandler,Path } from 'react-hook-form';
import "./BookingForm.css";
import axios from 'axios';

interface MyFormData {
  name: string;
  availabilityStep: number;
  durationMinutes: number;
  timeAvailableFor: string;
  subject: string;
  description: string;
  location: string;
  workHours: {
    daySchedules: {
      dayOfWeek: string;
      workingIntervals: {
        start: string;
        end: string;
      }[];
    }[];
    timezone: string;
  };

}



const BookingForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue
  } = useForm<MyFormData>();

  const [formattedStartTime, setFormattedStartTime] = useState<string>('');
  const [formattedEndTime, setFormattedEndTime] = useState<string>('');


  const onSubmit: SubmitHandler<MyFormData> = async(data:any) => {
    await axios.post(
        "http://localhost:3004/createBooking",
        {
          formData: {
            ...data,
            workHours: {
              ...data.workHours,
              daySchedules: [
                {
                  ...data.workHours.daySchedules[0],
                  workingIntervals: [
                    {
                      ...data.workHours.daySchedules[0].workingIntervals[0],
                      start: formattedStartTime,
                      end: formattedEndTime,
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );


  };
    



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        
        <h3>Booking Form</h3>
      <div>
        <label htmlFor="name">Name</label>
        <input {...register('name')} type="text" />
      </div>

      <div>
        <label htmlFor="availabilityStep">Availability Step</label>
        <input {...register('availabilityStep')} type="number" />
      </div>

      <div>
        <label htmlFor="durationMinutes">Duration (Minutes)</label>
        <input {...register('durationMinutes')} type="number" />
      </div>

      <div>
        <label htmlFor="timeAvailableFor">Time Available For</label>
        <input {...register('timeAvailableFor')} type="text" />
      </div>

      <div>
        <label htmlFor="subject">Subject</label>
        <input {...register('subject')} type="text" />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea rows={5} cols={45} {...register('description')} />
      </div>

      <div>
        <label htmlFor="location">Location</label>
        <input {...register('location')} type="text" />
      </div>

      {/* <div>
        <label htmlFor="workHours.daySchedules">Work Hours</label>
        <input {...register('workHours.daySchedules[0].dayOfWeek' as Path<MyFormData>)} type="text" placeholder="Day of Week" />
        <input {...register('workHours.daySchedules[0].workingIntervals[0].start' as Path<MyFormData>)} type="time" placeholder="Start Time" />
        <input {...register('workHours.daySchedules[0].workingIntervals[0].end' as Path<MyFormData>)} type="time" placeholder="End Time" />

      </div> */}


<div>
        <label htmlFor="workHours.daySchedules">Work Hours</label>
        <input
          {...register('workHours.daySchedules[0].dayOfWeek' as Path<MyFormData>)}
          type="text"
          placeholder="Day of Week"
        />
        <input
          {...register('workHours.daySchedules[0].workingIntervals[0].start' as Path<MyFormData>)}
          type="time"
          placeholder="Start Time"
          onChange={(e) => {
            // Handle formatting and update state
            const inputValue = e.target.value;
            const formattedValue = `${inputValue}:00Z`;
            setFormattedStartTime(formattedValue);
            setValue('workHours.daySchedules[0].workingIntervals[0].start' as Path<MyFormData>, formattedValue);
          }}
        />
        <input
          {...register('workHours.daySchedules[0].workingIntervals[0].end' as Path<MyFormData>)}
          type="time"
          placeholder="End Time"
          onChange={(e) => {
            // Handle formatting and update state
            const inputValue = e.target.value;
            const formattedValue = `${inputValue}:00Z`;
            setFormattedEndTime(formattedValue);
            setValue('workHours.daySchedules[0].workingIntervals[0].end' as Path<MyFormData>, formattedValue);
          }}
        />
      </div>



      <div>
        <label htmlFor="workHours.timezone">Timezone</label>
        <input {...register('workHours.timezone')} type="text" />
      </div>


      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default BookingForm;
