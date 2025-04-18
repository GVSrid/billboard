/*import Booking from '../models/booking.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const createBooking = async (req, res) => {
  try {
    const { customerName, startDate, endDate, slotsLeft, campaignDetails, playerId, playlistId } = req.body;
    const adFile = req.file?.filename;

    const booking = await Booking.create({
      customerName,
      startDate,
      endDate,
      slotsLeft,
      campaignDetails,
      adFile,
      playerId,
      playlistId
    });

    await axios.post(process.env.PISIGNAGE_API, {
      name: `Ad_${booking.id}`,
      player: [playerId],
      startDate,
      endDate,
      playlist: [playlistId]
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bookings' });
  }
};
*/

// controllers/bookingController.js
// controllers/bookingController.js

import { Sequelize } from 'sequelize';  
import { scheduleAd } from '../utils/piSignage.js';
import Slot from '../models/slot.js';  
import Booking from '../models/booking.js';  

export const createBooking = async (req, res) => {
  try {
    const {
      customerName,
      startDate,
      endDate,
      campaignDetails,
      adFile,
      playerId,
      playlistId
    } = req.body;

    if (!customerName || !startDate || !endDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({ message: 'Invalid start or end date' });
    }

    const currentDate = new Date();
    if (start < currentDate) {
      return res.status(400).json({ message: 'Booking date cannot be in the past' });
    }

    const daysBooked = Math.ceil((end - start) / (1000 * 3600 * 24)) + 1;
    const maxSlotsPerDay = 8;

    for (let i = 0; i < daysBooked; i++) {
      const dateToCheck = new Date(start);
      dateToCheck.setDate(dateToCheck.getDate() + i);
      const formattedDate = dateToCheck.toISOString().split('T')[0];

      let slot = await Slot.findOne({ where: { date: formattedDate } });

      if (!slot) {
        slot = await Slot.create({ date: formattedDate, slotsLeft: maxSlotsPerDay });
      }

      if (slot.slotsLeft <= 0) {
        return res.status(400).json({ message: `No slots available on ${formattedDate}` });
      }
    }

    const booking = await Booking.create({
      customerName,
      startDate,
      endDate,
      campaignDetails,
      adFile,
      playerId,
      playlistId
    });

    for (let i = 0; i < daysBooked; i++) {
      const dateToUpdate = new Date(start);
      dateToUpdate.setDate(dateToUpdate.getDate() + i);
      const formattedDate = dateToUpdate.toISOString().split('T')[0];

      await Slot.update(
        { slotsLeft: Sequelize.literal('slotsLeft - 1') },
        { where: { date: formattedDate } }
      );
    }

    // 🔥 Schedule Ad only after successful booking
    await scheduleAd(playerId, playlistId, startDate, endDate);

    // ✅ Send booking response after everything succeeds
    res.status(201).json(booking);
    
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
