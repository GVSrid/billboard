const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Booking = require('./booking')(sequelize, Sequelize.DataTypes);

module.exports = {
  sequelize,
  Booking
};
