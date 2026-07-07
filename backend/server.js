import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import patientRoutes from './routes/patients.js';
import roomRoutes from './routes/rooms.js';
import transferRoutes from './routes/transfers.js';
import dashboardRoutes from './routes/dashboard.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Smart Hospital Management API is running');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/patients', patientRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));