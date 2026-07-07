import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  ward: { type: String, required: true }, // General, ICU, Private, etc.
  totalBeds: { type: Number, required: true },
  occupiedBeds: { type: Number, default: 0 },
  status: { type: String, enum: ['Available', 'Occupied', 'Reserved', 'Cleaning'], default: 'Available' },
});

export default mongoose.model('Room', roomSchema);