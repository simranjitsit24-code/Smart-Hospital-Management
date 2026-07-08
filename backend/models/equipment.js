import mongoose from 'mongoose';

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roomNumber: { type: String, ref: 'Room' },
  status: { type: String, enum: ['Available', 'In Use', 'Under Maintenance'], default: 'Available' },
  lastChecked: { type: Date, default: Date.now },
});

export default mongoose.model('Equipment', equipmentSchema);