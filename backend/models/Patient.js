import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  patientId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: Number,
  gender: String,
  disease: String,
  roomNumber: String,
  ward: String,
  admissionDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Admitted', 'Discharged'], default: 'Admitted' },
  contact: String,
  // optional fields for discharge summary
  dischargeDate: Date,
  dischargeNotes: String,
});

export default mongoose.model('Patient', patientSchema);