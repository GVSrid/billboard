// routes/pisignage.js
const express = require('express');
const router = express.Router();
const pisignageService = require('..utils/piSignageServices');

router.get('/login', async (req, res) => {
  try {
    const token = await pisignageService.login();
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error during login', error: err.message });
  }
});

router.get('/players', async (req, res) => {
  try {
    const players = await pisignageService.getPlayers();
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching players', error: err.message });
  }
});

module.exports = router;
