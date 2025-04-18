/*import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

export default sequelize;
*/

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, 
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(' PostgreSQL connected.');
    await sequelize.sync(); 
    console.log('Models synced.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

export default sequelize;
