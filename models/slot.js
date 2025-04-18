import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Slot = sequelize.define('Slot', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: true,
    primaryKey: false,
  },
  slotsLeft: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 8,
  },
}, {
  timestamps: true,
  tableName: 'Slots',  
});


export default Slot;
