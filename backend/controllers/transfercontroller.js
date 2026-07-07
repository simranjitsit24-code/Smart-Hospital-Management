import Transfer from '../models/transfer.js';
import Patient from '../models/Patient.js';
import Room from '../models/room.js';
export const createTransfer = async (req, res) => {
  const { patientId, fromRoom, toRoom, reason } = req.body;
  // Validate rooms and patient status (admitted)
  const transfer = new Transfer({ patientId, fromRoom, toRoom, reason });
  await transfer.save();
  // Update patient's room
  const patient = await Patient.findOne({ patientId });
  if (patient) {
    patient.roomNumber = toRoom;
    await patient.save();
  }
  // Update room occupancy (decrease fromRoom, increase toRoom)
  // ...
  res.status(201).json(transfer);
};

export const getPatientTimeline = async (req, res) => {
  const { patientId } = req.params;
  const transfers = await Transfer.find({ patientId }).sort({ transferDate: 1 });
  const patient = await Patient.findOne({ patientId });
  const timeline = [
    { event: 'Admitted', date: patient.admissionDate, details: `Admitted to ${patient.roomNumber}` },
    ...transfers.map(t => ({ event: 'Transferred', date: t.transferDate, details: `From ${t.fromRoom} to ${t.toRoom}` })),
  ];
  if (patient.status === 'Discharged') {
    timeline.push({ event: 'Discharged', date: patient.dischargeDate, details: 'Discharged' });
  }
  res.json(timeline);
};