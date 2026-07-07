import Patient from '../models/Patient.js';
import Room from '../models/Room.js';
import Transfer from '../models/Transfer.js';

// Generate next patient ID
const generatePatientId = async () => {
  const last = await Patient.findOne().sort({ patientId: -1 });
  if (!last) return 'P1001';
  const num = parseInt(last.patientId.slice(1)) + 1;
  return `P${num}`;
};

// Register new patient (includes room assignment)
export const registerPatient = async (req, res) => {
  try {
    const { name, age, gender, disease, ward, roomNumber } = req.body;
    // Validate room availability
    const room = await Room.findOne({ roomNumber });
    if (!room) return res.status(404).json({ error: 'Room not found' });
    if (room.occupiedBeds >= room.totalBeds) {
      return res.status(400).json({ error: 'No beds available in this room' });
    }

    const patientId = await generatePatientId();
    const newPatient = new Patient({
      patientId,
      name,
      age,
      gender,
      disease,
      ward,
      roomNumber,
      status: 'Admitted',
    });
    await newPatient.save();

    // Update room occupancy
    room.occupiedBeds += 1;
    if (room.occupiedBeds === room.totalBeds) room.status = 'Occupied';
    else room.status = 'Available';
    await room.save();

    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all patients (with search & filter)
export const getPatients = async (req, res) => {
  try {
    const { q, ward, status } = req.query;
    const filter = {};
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { patientId: { $regex: q, $options: 'i' } },
        { roomNumber: { $regex: q, $options: 'i' } },
      ];
    }
    if (ward) filter.ward = ward;
    if (status) filter.status = status;

    const patients = await Patient.find(filter).sort({ admissionDate: -1 });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update patient details (e.g., transfer, discharge)
export const updatePatient = async (req, res) => {
  // ... handle updates
};

// Discharge patient
export const dischargePatient = async (req, res) => {
  const { patientId } = req.params;
  const { dischargeNotes } = req.body;
  const patient = await Patient.findOne({ patientId });
  if (!patient) return res.status(404).json({ error: 'Patient not found' });

  // Release room
  const room = await Room.findOne({ roomNumber: patient.roomNumber });
  if (room) {
    room.occupiedBeds -= 1;
    if (room.occupiedBeds < 0) room.occupiedBeds = 0;
    room.status = room.occupiedBeds === room.totalBeds ? 'Occupied' : 'Available';
    await room.save();
  }

  patient.status = 'Discharged';
  patient.dischargeDate = new Date();
  patient.dischargeNotes = dischargeNotes || '';
  await patient.save();
  res.json(patient);
};