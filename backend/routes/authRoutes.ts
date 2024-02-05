import express, { Router } from 'express';
import { handleCallback } from '../controllers/authController';

const router = express.Router();

router.post('/callback', handleCallback);

module.exports = router;

