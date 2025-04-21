import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Booking = sequelize.define('Booking', {
  customerName: DataTypes.STRING,
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,
  slotsLeft: DataTypes.INTEGER,
  campaignDetails: DataTypes.TEXT,
  adFile: DataTypes.STRING,
  playerId: DataTypes.STRING,
  playlistId: DataTypes.STRING,
},
{
    tableName: 'booking_data' 
  });

export default Booking;
