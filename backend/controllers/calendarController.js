const axios = require("axios");

// get list of calendars form Aurinko
async function getCalendars(req, res) {
  try {
    const response = await axios.get(
      req.params.pageToken
      ? `https://api.aurinko.io/v1/calendars?pageToken=${req.params.pageToken}`
      : "https://api.aurinko.io/v1/calendars",
      {
        headers: {
          Authorization: req.headers.authorization,
          "Content-Type": "application/json",
        },
      }
    );
    res.send(response?.data);
  } catch (error) {
    console.error("Error creating calendar:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// create calendar by Aurinko
async function createCalendar(req, res) {
  try {
    const response = await axios.post(
      "https://api.aurinko.io/v1/calendars",
      { ...req.body.formData },
      {
        headers: {
          Authorization: `${req.headers.authorization}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.send(response?.data);
  } catch (error) {
    console.error("Error creating calendar:", error);
    res.status(200).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getCalendars,
  createCalendar,
};
