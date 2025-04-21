/*import { DataTypes } from 'sequelize';
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
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  }
  
}, {
  timestamps: true,
  tableName: 'Slots',  
});

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('Slots', 'id', {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  });
}



export default Slot;

*/
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Slot = sequelize.define('Slot', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: true,
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

