const axios = require("axios");
const User = require("../models/userModel");

// to get user Account information from token by Aurinko
async function getUserInfo(req, res) {
  const { token } = req.body;

  try {
    let { data } = await axios.get("https://api.aurinko.io/v1/account", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    //  save the user info to database
    const newUser = new User({
      username: data.name,
      email: data.email,
    });

    return newUser.save().then((resUser) => {
      //  send response after saving it in to database
      res.send(resUser);
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getUserInfo,
};
