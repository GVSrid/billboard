import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import bookingRoutes from './routes/bookingRoutes.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import piSignageRoutes from './routes/piSignageRoutes.js';


dotenv.config(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express(); //

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.static(__dirname + '/public')); 




app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('Database connected and synced');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
app.use('/api/bookings', bookingRoutes);
app.use('/api/pisignage', piSignageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


