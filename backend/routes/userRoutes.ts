import express, { Router } from 'express';
import { getUserInfo } from '../controllers/userController';

const router = express.Router();


router.post('/userInfo', getUserInfo);

module.exports = router;

