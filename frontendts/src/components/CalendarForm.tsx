import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  name: string;
  color: string;
  description: string;
}

const CalendarForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [calanderData, setCalanderData] = useState<FormData[] | []>([]);
  const [nextPageToken, setNextPageToken] = useState<String>("");

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data, "data");

    // to create calendar
    axios
      .post(
        "http://localhost:3004/calendar/calendar",
        {
          formData: data,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        handleGetCalendarsList();
        setCalanderData([]);
        setNextPageToken("");
        alert("created Successfully");
      });
  };

  const handleGetCalendarsList = async () => {
    // to get all the calendars which is created
    try {
      const response = await axios.get(
        `http://localhost:3004/calendar/calendars/${nextPageToken ?? ""}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCalanderData(response?.data?.records);
      setNextPageToken(response?.data?.nextPageToken);
      console.log(response);
    } catch (error) {
      console.error("Error creating calendar:", error);
    }
  };

  useEffect(() => {
    handleGetCalendarsList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Create Calander</h3>
        <div>
          <label htmlFor="name">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="color">Color</label>
          <input
            {...register("color", { required: "Color is required" })}
            type="text"
          />
          {errors.color && <p>{errors.color.message}</p>}
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={5}
            cols={45}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <button type="submit">Create Form</button>
      </form>
      <div>
        <h3>All Calendars</h3>
        <div className="booking-container">
          {calanderData?.map((data, index) => (
            <div
              style={{ backgroundColor: data?.color, color: "#2e2e2e" }}
              key={index}
              className="booking-box"
            >
              <p>NAME: {data?.name}</p>
              <p>COLOR: {data?.color}</p>
              <p>DESCRIPTION: {data?.description}</p>
            </div>
          ))}
        </div>
      </div>
      {
        (<button onClick={handleGetCalendarsList}>
          {nextPageToken ? "Next" : "Previous page"}
        </button>)
      }
    </>
  );
};

export default CalendarForm;
