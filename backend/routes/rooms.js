import express from 'express';
import { getRooms, addRoom, suggestRoom, updateRoom } from '../controllers/roomcontroller.js';

const router = express.Router();

router.get('/', getRooms);
router.post('/', addRoom);
router.get('/suggest', suggestRoom);
router.put('/:roomNumber', updateRoom);

export default router;