

import axios from 'axios';

const PI_BASE_URL = 'http://192.168.1.10:3000';
const PI_API_KEY = '5000-0000-0c9c-1e9d';

const axiosInstance = axios.create({
  baseURL: PI_BASE_URL,
  headers: {
    'x-access-token': PI_API_KEY
  }
});

export const getPlayers = async () => {
  const res = await axiosInstance.get('/players');
  return res.data;
};

export const getGroups = async () => {
  const res = await axiosInstance.get('/groups');
  return res.data;
};

export const scheduleAd = async (playlistId, playerId, scheduleData) => {
  const res = await axiosInstance.post('/schedule', {
    playlistId,
    playerId,
    schedule: scheduleData
  });
  return res.data;
};

