import mongoose from 'mongoose';
import Room from './models/Room.js';
import dotenv from 'dotenv';
dotenv.config();

const wards = ['General', 'ICU', 'Private', 'Semi-Private', 'Maternity', 'Surgical'];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected, seeding...');

  for (let floor = 1; floor <= 6; floor++) {
    const ward = wards[floor - 1];
    for (let roomNum = 1; roomNum <= 100; roomNum++) {
      const roomNumber = `${String(floor).padStart(2, '0')}-${String(roomNum).padStart(3, '0')}`;
      
      // 🔹 Upsert – insert if not exists, update if exists
      await Room.findOneAndUpdate(
        { roomNumber },
        {
          roomNumber,
          ward,
          totalBeds: 2,
          occupiedBeds: 0,
          status: 'Available',
        },
        { upsert: true }   // <-- this is where it goes
      );
    }
    console.log(`Floor ${floor} done`);
  }

  const count = await Room.countDocuments();
  console.log(`✅ Seeded ${count} rooms total`);
  process.exit();
};

seed().catch(err => { console.error(err); process.exit(1); });