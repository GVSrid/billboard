import api from '../utils/pisignageAPI.js';

export const getPlayerInfo = async (playerId) => {
  try {
    const res = await api.get(`/players/${playerId}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching player info:', error.message);
    throw error;
  }
};
