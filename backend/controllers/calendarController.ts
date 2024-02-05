import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';

interface AurinkoApiResponse {
  // Define the expected response structure if needed
  // For example:
  // calendars: Calendar[];
  // calendar: Calendar;
}

// get list of calendars form Aurinko
async function getCalendars(req: Request, res: Response): Promise<void> {
  try {
    const response: AxiosResponse<AurinkoApiResponse> = await axios.get(
      req.params.pageToken
        ? `https://api.aurinko.io/v1/calendars?pageToken=${req.params.pageToken}`
        : 'https://api.aurinko.io/v1/calendars',
      {
        headers: {
          Authorization: req.headers.authorization as string,
          'Content-Type': 'application/json',
        },
      }
    );

    res.send(response?.data);
  } catch (error) {
    console.error('Error getting calendars:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// create calendar by Aurinko
async function createCalendar(req: Request, res: Response): Promise<void> {
  try {
    const response: AxiosResponse<AurinkoApiResponse> = await axios.post(
      'https://api.aurinko.io/v1/calendars',
      {...req.body.formData},
      {
        headers: {
          Authorization: `${req.headers.authorization}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.send(response?.data);
  } catch (error) {
    console.error('Error creating calendar:', error);
    res.status(200);
  }
}

export { getCalendars, createCalendar };
