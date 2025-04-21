
import express from 'express';
import { login, getPlayers } from '../utils/piSignageService.js'

const router = express.Router();


router.get('/players', async (req, res) => {
  try {
    const players = await getPlayers();
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching players', error: err.message });
  }
});


router.get('/players/:playerId', async (req, res) => {
  try {
    const { playerId } = req.params;
    const response = await axiosInstance.get(`/api/players/${playerId}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching player info', error: err.message });
  }
});


router.get('/groups', async (req, res) => {
  try {
    const groups = await getGroups();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching groups', error: err.message });
  }
});


router.post('/groups', async (req, res) => {
  try {
    const response = await axiosInstance.post('/api/groups', req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error creating group', error: err.message });
  }
});

router.post('/groups/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;
    const response = await axiosInstance.post(`/api/groups/${groupId}`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error assigning playlist to group', error: err.message });
  }
});

router.post('/playlists', async (req, res) => {
  try {
    const response = await axiosInstance.post('/api/playlists', req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error creating playlist', error: err.message });
  }
});


router.post('/setplaylist/:playerId/:playlist', async (req, res) => {
  try {
    const { playerId, playlist } = req.params;
    const response = await axiosInstance.post(`/api/setplaylist/${playerId}/${playlist}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error setting playlist to player', error: err.message });
  }
});

router.post('/playlistmedia/:playerId/play', async (req, res) => {
  try {
    const { playerId } = req.params;
    const response = await axiosInstance.post(`/api/playlistmedia/${playerId}/play`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error starting playlist playback', error: err.message });
  }
});


router.post('/files', async (req, res) => {
  try {
    const response = await axiosInstance.post('/api/files', req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error uploading media', error: err.message });
  }
});


router.post('/postupload', async (req, res) => {
  try {
    const response = await axiosInstance.post('/api/postupload', req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error finalizing upload', error: err.message });
  }
});


router.post('/schedule', async (req, res) => {
  try {
    const data = await scheduleAd(req.body);
    res.json({ message: 'Ad scheduled successfully', data });
  } catch (err) {
    res.status(500).json({ message: 'Error scheduling ad', error: err.message });
  }
});

router.get('/status', async (req, res) => {
  try {
    const response = await axiosInstance.get('/api/status');
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching status', error: err.message });
  }
});

export default router;
