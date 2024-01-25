const axios = require("axios");
const Booking = require("../models/bookingFormModel");

async function createBooking(req, res) {
  const { token } = req.body;
  // create booking profile by Aurinko
  try {
    const response = await axios.post(
      "https://api.aurinko.io/v1/book/profiles",
      {
        ...req.body.formData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const booking = new Booking({
      ...response.data,
    });
    // save the booking information to database from response by aurinko
    return booking.save().then((formData) => {
      //  send response to frontend after saving it in to database
      res.send(formData);
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


// get all booking lists latest at the top  from data base
async function getAllBookingList(req, res) {
  try {
    const allBookings = await Booking.find().sort({ createdAt: -1 });
    res.json(allBookings);
  } catch (error) {
    console.error("Error in bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createBooking,
  getAllBookingList,
};
