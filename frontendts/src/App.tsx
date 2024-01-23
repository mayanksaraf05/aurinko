import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import BookingForm from "./components/BookingForm";
import AuthCallback from "./components/AuthCallback";

function App() {
  const [state, setState] = useState<string | null>(null);
  const [token, setToken] = useState<String | null>("");

  const handleLogin = () => {
    window.open(
      "https://api.aurinko.io/v1/auth/authorize?clientId=75a434028df53f392b967f6f7a6b0ab1&serviceType=Google&serviceType=Google&scopes=Calendar.ReadWrite Mail.Read Mail.Send&responseType=code&returnUrl=http://localhost:3000"
    );
  };

  const handleCreateCalendar = async () => {
    try {
      const response = await axios.post(
        "https://api.aurinko.io/v1/book/profiles",
        {
          name: "New calendar",
          color: "red",
          description: "test",
        },
        {
          headers: {
            Authorization: "Bearer myspW9wGgJ2gVh0lZOPYz2gPeA2d1x5qsZ79EYbsnzU",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data, "response");
    } catch (error) {
      console.error("Error creating calendar:", error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let authorizationCode = urlParams.get("code");

    if (authorizationCode && !localStorage.getItem("accessToken")) {
      axios
        .post("http://localhost:3004/callback", {
          code: authorizationCode,
        })
        .then((res) => {
          localStorage.setItem("accessToken", res.data.accessToken);
          setToken(res.data.accessToken);
          axios
            .post(`http://localhost:3004/userInfo`, {
              token: res.data.accessToken,
            })
            .then((response) => {
              localStorage.setItem("UserInfo", JSON.stringify(response.data));
            });
        });

      console.log("Authorization Code:", authorizationCode);
      authorizationCode = "";
    } else {
      console.error("Authorization code not found in the URL.");
    }

    setToken(localStorage.getItem("accessToken"));
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    setToken("");
  };

  return (
    <div className="App">
      {!token && <button style={{margin:"10px"}} onClick={handleLogin}>login</button>}
      {!!token && (
        <div style={{display:"flex",justifyContent:"end"}}>
          <button onClick={handleLogOut}>logout</button>
        </div>
      )}

      {!!token && <BookingForm />}
    </div>
  );
}

export default App;
