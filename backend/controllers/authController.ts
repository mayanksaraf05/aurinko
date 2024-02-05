import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';

//  to get token from code given in redirect URL by Aurinko
async function handleCallback(req: Request, res: Response): Promise<void> {
  const { code } = req.body;

  try {
    if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
      throw new Error('Missing CLIENT_ID or CLIENT_SECRET in environment variables');
    }

    const response: AxiosResponse = await axios.post(
      `https://api.aurinko.io/v1/auth/token/${code}`,
      '',
      {
        auth: {
          username: process.env.CLIENT_ID,
          password: process.env.CLIENT_SECRET,
        },
      }
    );

    res.send(response?.data);
  } catch (error) {
    console.error('Error handling callback:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { handleCallback };
