
import api from '../utils/pisignageAPI.js';

export const scheduleAd = async (playerId, playlistId, startDate, endDate) => {
  const schedule = {
    player: playerId,
    schedule: [
      {
        playlist: playlistId,
        startDate: startDate,
        endDate: endDate,
        startTime: '00:00',
        endTime: '23:59',
        recurrence: 'daily',
      },
    ],
  };

  try {
    const res = await api.post('/schedule', schedule);
    console.log('Schedule response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Failed to schedule playlist:', error.message);
    throw error;
  }
};
