import mongoose from 'mongoose';

const transferSchema = new mongoose.Schema({
  patientId: { type: String, required: true, ref: 'Patient' },
  fromRoom: String,
  toRoom: String,
  transferDate: { type: Date, default: Date.now },
  reason: String,
});

export default mongoose.model('Transfer', transferSchema);