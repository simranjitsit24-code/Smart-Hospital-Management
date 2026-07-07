import Patient from '../models/Patient.js';
import Room from '../models/room.js';

export const getDashboardStats = async (req, res) => {
  const totalPatients = await Patient.countDocuments();
  const admitted = await Patient.countDocuments({ status: 'Admitted' });
  const discharged = await Patient.countDocuments({ status: 'Discharged' });
  const totalBeds = await Room.aggregate([{ $group: { _id: null, total: { $sum: '$totalBeds' } } }]);
  const occupiedBeds = await Room.aggregate([{ $group: { _id: null, total: { $sum: '$occupiedBeds' } } }]);
  const wardStats = await Room.aggregate([
    { $group: { _id: '$ward', totalBeds: { $sum: '$totalBeds' }, occupied: { $sum: '$occupiedBeds' } } }
  ]);

  res.json({
    totalPatients,
    admitted,
    discharged,
    totalBeds: totalBeds[0]?.total || 0,
    occupiedBeds: occupiedBeds[0]?.total || 0,
    availability: ((totalBeds[0]?.total - occupiedBeds[0]?.total) / totalBeds[0]?.total) * 100 || 0,
    wardStats,
  });
};