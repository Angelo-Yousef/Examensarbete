const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// GET: Hämta alla bokningar för att kunna visa upptagna tider
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Fel vid hämtning:', error);
    res.status(500).json({ message: 'Kunde inte hämta bokningar.' });
  }
});

// GET: Hämta bokningar för en e-post
router.get('/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const bookings = await Booking.find({ email }).sort({ date: 1, time: 1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Hämtningsfel:', error);
    res.status(500).json({ message: 'Kunde inte hämta bokningar' });
  }
});

// POST: Skapa bokning
router.post('/', async (req, res) => {
  const { email, date, time } = req.body;

  if (!email || !date || !time) {
    return res.status(400).json({ message: 'Alla fält krävs.' });
  }

  try {
    // Kontrollera om samma tid är bokad för samma dag, oavsett användare
    const existingBooking = await Booking.findOne({ date, time });
    if (existingBooking) {
      return res.status(409).json({ message: '❌ Tiden är redan bokad.' });
    }

    const booking = new Booking({ email, date, time });
    await booking.save();
    res.status(201).json({ message: 'Bokning skapad!', booking });
  } catch (error) {
    console.error('Bokningsfel:', error);
    res.status(500).json({ message: 'Kunde inte skapa bokning.' });
  }
});

// DELETE: Avboka en specifik bokning
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Bokning hittades inte' });
    }

    res.status(200).json({ message: 'Bokning avbokad!' });
  } catch (error) {
    console.error('Avbokningsfel:', error);
    res.status(500).json({ message: 'Kunde inte avboka bokning' });
  }
});

module.exports = router;
