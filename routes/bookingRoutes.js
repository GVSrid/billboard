import express from 'express';
import multer from 'multer';
import { createBooking } from '../controllers/bookingController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('adFile'), createBooking);
//router.get('/', getAllBookings);

export default router;
