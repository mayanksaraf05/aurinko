import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import BookingForm from "./components/BookingForm";
import CalendarForm from "./components/CalendarForm";

function App() {
  const [token, setToken] = useState<String | null>("");
  const [createCalendar, setCreateCalendar] = useState<boolean>(false);
  const [showBookingForm, setShowBookingForm] = useState<boolean>(true);

  const handleLogin = () => {
    // for google Oauth screen
    window.open(
      `https://api.aurinko.io/v1/auth/authorize?clientId=${process.env.REACT_APP_AURINKO_CLIENT_ID}&serviceType=Google&serviceType=Google&scopes=Calendar.ReadWrite Mail.Read Mail.Send&responseType=code&returnUrl=${process.env.REACT_APP_REDIRECT_URL}`
    );
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // save the code given by Aurinko Google Oauth from url
    let authorizationCode = urlParams.get("code");

    if (authorizationCode && !localStorage.getItem("accessToken")) {
      // for convert code given by Aurinko auth in url to token
      axios
        .post("http://localhost:3004/auth/callback", {
          code: authorizationCode,
        })
        .then((res) => {
          localStorage.setItem("accessToken", res.data.accessToken);
          setToken(res.data.accessToken);

          // fetch user information from token and  save Information in database
          axios
            .post(`http://localhost:3004/user/userInfo`, {
              token: res.data.accessToken,
            })
            .then((response) => {
              localStorage.setItem("UserInfo", JSON.stringify(response.data));
            });
        });

      authorizationCode = "";
    } else {
      console.error("Authorization code not found in the URL.");
    }

    setToken(localStorage.getItem("accessToken"));
  }, []);

  const handleLogOut = () => {
    // redirect to base url and remove token from local storage
    window.location.href = "http://localhost:3000/";
    localStorage.removeItem("accessToken");
    setToken("");
  };

  const handleClickCalendar = () => {
    setCreateCalendar(!createCalendar);
  };

  return (
    <div className="App">
      {!token && (
        <button style={{ margin: "10px" }} onClick={handleLogin}>
          login
        </button>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          background: "#4caf50",
        }}
      >
        {!!token && !createCalendar && (
          <button
            style={{ marginRight: "10px" }}
            onClick={() => setShowBookingForm(!showBookingForm)}
          >
            {!showBookingForm
              ? "Back to create form"
              : "Show latest applied bookings"}
          </button>
        )}
        {!!token && (
          <button onClick={handleClickCalendar}>
            {!!createCalendar ? "Back to form" : "Create calendar"}
          </button>
        )}
        {!!token && (
          <button style={{ marginLeft: 10 }} onClick={handleLogOut}>
            logout
          </button>
        )}
      </div>

      {!!token && !!createCalendar && <CalendarForm />}
      {!!token && !createCalendar && (
        <BookingForm
          showBookingForm={showBookingForm}
          setShowBookingForm={setShowBookingForm}
        />
      )}
    </div>
  );
}

export default App;
