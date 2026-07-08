import Patient from '../models/Patient.js';
import Room from '../models/room.js';

export const getDashboardStats = async (req, res) => {
  try {
    // ── Count patients ──────────────────────────────────────
    const totalPatients = await Patient.countDocuments();
    const admitted = await Patient.countDocuments({ status: 'Admitted' });
    const discharged = await Patient.countDocuments({ status: 'Discharged' });

    // ── Room and bed statistics ────────────────────────────
    const rooms = await Room.find();
    const totalRooms = rooms.length;
    let totalBeds = 0;
    let occupiedBeds = 0;
    let occupiedRooms = 0;
    let availableRooms = 0;

    rooms.forEach(room => {
      totalBeds += room.totalBeds;
      occupiedBeds += room.occupiedBeds;
      if (room.occupiedBeds > 0) occupiedRooms++;
      if (room.occupiedBeds < room.totalBeds) availableRooms++;
    });

    const availableBeds = totalBeds - occupiedBeds;
    const occupancyPercent = totalBeds ? ((occupiedBeds / totalBeds) * 100).toFixed(1) : 0;

    // ── Ward-wise statistics ──────────────────────────────
    const wardStats = await Room.aggregate([
      {
        $group: {
          _id: '$ward',
          totalBeds: { $sum: '$totalBeds' },
          occupied: { $sum: '$occupiedBeds' },
          roomCount: { $sum: 1 },
        },
      },
      {
        $project: {
          ward: '$_id',
          totalBeds: 1,
          occupied: 1,
          available: { $subtract: ['$totalBeds', '$occupied'] },
          roomCount: 1,
        },
      },
    ]);

    res.json({
      totalPatients,
      admitted,
      discharged,
      totalRooms,           // number of rooms
      occupiedRooms,        // rooms with at least one occupied bed
      availableRooms,       // rooms with at least one free bed
      totalBeds,            // sum of all beds
      occupiedBeds,         // sum of occupied beds
      availableBeds,        // totalBeds - occupiedBeds
      occupancyPercent: parseFloat(occupancyPercent),
      wardStats,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};