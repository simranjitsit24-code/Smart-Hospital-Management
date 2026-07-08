import Equipment from '../models/equipment.js';

export const getEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find().sort({ roomNumber: 1 });
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addEquipment = async (req, res) => {
  try {
    const { name, roomNumber, status } = req.body;
    const eq = new Equipment({ name, roomNumber, status });
    await eq.save();
    res.status(201).json(eq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update, delete as needed