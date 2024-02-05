import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import BookingModel from '../models/bookingFormModel';

interface AurinkoApiResponse {
  // Define the expected response structure if needed
  // For example:
  // bookingProfile: BookingProfile;
}

// create booking profile by Aurinko
async function createBooking(req: Request, res: Response): Promise<void> {
  const { token } = req.body;

  try {
    const response: AxiosResponse<AurinkoApiResponse> = await axios.post(
      'https://api.aurinko.io/v1/book/profiles',
      {
        ...req.body.formData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const booking = new BookingModel({
      ...response.data,
    });

    // save the booking information to the database from response by Aurinko
    return booking.save().then((formData: InstanceType<typeof BookingModel>) => {

      // send response to frontend after saving it in the database
      res.send(formData);
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// get all booking lists latest at the top from the database
async function getAllBookingList(req: Request, res: Response): Promise<void> {
  try {
    const allBookings = await BookingModel.find().sort({ createdAt: -1 });
    res.json(allBookings);
  } catch (error) {
    console.error('Error in bookings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { createBooking, getAllBookingList };
