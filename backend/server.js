import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import patientRoutes from './routes/patients.js';
import roomRoutes from './routes/rooms.js';
import transferRoutes from './routes/transfers.js';
import dashboardRoutes from './routes/dashboard.js';
import equipmentRoutes from './routes/equipment.js';  // uncomment when ready

dotenv.config();

const app = express();          // ← app must be defined before using it

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('🚀 Smart Hospital Management API is running'));

// ─── Routes ────────────────────────────────────────────────
app.use('/api/patients', patientRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/equipment', equipmentRoutes);   // uncomment when ready

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });