import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import User from '../models/userModel';

// to get user Account information from token by Aurinko
async function getUserInfo(req: Request, res: Response): Promise<void> {
  const { token } = req.body;

  try {
    const { data }: AxiosResponse = await axios.get('https://api.aurinko.io/v1/account', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // save the user info to the database
    const newUser = new User({
      username: data.name,
      email: data.email,
    });

    return newUser.save().then((resUser: any) => {
      // send response after saving it to the database
      res.send(resUser);
    });
  } catch (error) {
    console.error('Error getting user info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { getUserInfo };
