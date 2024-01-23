const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const User = require("./models/userModel");
const { default: mongoose } = require("mongoose");

const app = express();
const port = 3004;

app.use(bodyParser.json());







mongoose.connect('mongodb://localhost/Aurinko');
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const registeredUsers = {};

app.post("/createBooking", async (req, res) => {
console.log(req.body,"reqqq body")

const {token}=req.body

  try {
    await axios.post(
      "https://api.aurinko.io/v1/book/profiles",
      {
        ...req.body.formData
      },
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/userInfo", async (req, res) => {
  const { token } = req.body;
  try {
    let { data } = await axios.get("https://api.aurinko.io/v1/account", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const newUser = new User({
      username: data.name,
      email: data.email,
    });

    return newUser.save().then((resUser) => {
      console.log(resUser,"newwwwwwww")
      res.send(resUser)

    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/auth", async (req, res) => {
  try {
    let config = {
      method: "get",
      url: `https://api.aurinko.io/v1/auth/authorize?clientId=75a434028df53f392b967f6f7a6b0ab1&serviceType=Google&scopes=Calendar.ReadWrite Mail.Read Mail.Send&responseType=code&returnUrl=http://localhost:3000`,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response, "==================");
        res.header("Content-Type", "text/html");
        res.send(response.data);
        return response;
      })
      .catch((error) => {
        console.log(error);
        console.log("test");
      });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/callback", async (req, res) => {
  const { code } = req.body;

  axios
    .post(`https://api.aurinko.io/v1/auth/token/${code}`, "", {
      auth: {
        username: "75a434028df53f392b967f6f7a6b0ab1",
        password:
          "rRnyHnjYWfRUmJFzmJ9xucQ7U1t_qPKRETjmuMPD6m7ZHMaAYYZDrRJ9-TH0PFJ-MKO7Jhxee4lMQuhy9P8myw",
      },
    })
    .then((ress) => {
      console.log(ress.data, "resssssss");

      res.send(ress?.data);
    });
});

app.post("/calender", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.aurinko.io/v1/calendars",
      { name: "New calendar", color: "red", description: "test" },
      {
        headers: {
          Authorization: "Bearer nPBvxt36Qx53AJr6fLW8tPmDhBcItS5LoIvvgIKiLc0",
          "Content-Type": "application/json",
          username: "75a434028df53f392b967f6f7a6b0ab1",
          password:
            "rRnyHnjYWfRUmJFzmJ9xucQ7U1t_qPKRETjmuMPD6m7ZHMaAYYZDrRJ9-TH0PFJ-MKO7Jhxee4lMQuhy9P8myw",
        },
      }
    );

    console.log(response);
  } catch (error) {
    console.error("Error creating calendar:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getUsernameFromToken = (authToken) => {
  if (!authToken) {
    return undefined;
  }

  return authToken.split("-")[0];
};

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
