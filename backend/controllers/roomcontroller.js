// Get all rooms with occupancy stats
export const getRooms = async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
};

// Add new room
export const addRoom = async (req, res) => {
  const { roomNumber, ward, totalBeds } = req.body;
  const room = new Room({ roomNumber, ward, totalBeds, occupiedBeds: 0 });
  await room.save();
  res.status(201).json(room);
};

export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findOneAndUpdate(
      { roomNumber: req.params.roomNumber },
      req.body,
      { new: true }
    );
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Smart room suggestion
export const suggestRoom = async (req, res) => {
  const { ward } = req.query;
  const room = await Room.findOne({ ward, occupiedBeds: { $lt: '$totalBeds' } }).sort({ occupiedBeds: 1 });
  if (!room) return res.status(404).json({ error: 'No available room in this ward' });
  res.json(room);
};