import Room from '../models/room.js';

// ─── Get all rooms ─────────────────────────────────────────
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ─── Add a new room ────────────────────────────────────────
export const addRoom = async (req, res) => {
  try {
    const { roomNumber, ward, totalBeds, status } = req.body;
    const room = await Room.findOneAndUpdate(
      { roomNumber },
      { roomNumber, ward, totalBeds, occupiedBeds: 0, status: status || 'Available' },
      { upsert: true, new: true }
    );
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ─── Update room (e.g., status) ───────────────────────────
export const updateRoom = async (req, res) => {
  try {
    const { roomNumber } = req.params;
    const updates = req.body;
    const room = await Room.findOneAndUpdate(
      { roomNumber },
      updates,
      { new: true, runValidators: true }
    );
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ─── Smart room suggestion ────────────────────────────────
export const suggestRoom = async (req, res) => {
  try {
    const { ward } = req.query;
    if (!ward) return res.status(400).json({ error: 'Ward parameter required' });

    const room = await Room.findOne({
      ward,
      $expr: { $lt: ['$occupiedBeds', '$totalBeds'] },
    }).sort({ occupiedBeds: 1 });

    if (!room) return res.status(404).json({ error: 'No available room in this ward' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};