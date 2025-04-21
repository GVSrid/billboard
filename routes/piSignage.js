
import { Router } from 'express';
const router = Router();
//import {piSignageService} from '..utils/piSignageService';
import { login, getPlayers } from '../utils/piSignageService.js';

router.get('/login', async (req, res) => {
  try {
    const token = await login();
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error during login', error: err.message });
  }
});

router.get('/players', async (req, res) => {
  try {
    const players = await getPlayers();
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching players', error: err.message });
  }
});

export default router;
