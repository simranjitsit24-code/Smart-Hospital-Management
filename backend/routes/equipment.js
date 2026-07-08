import express from 'express';
import { getEquipment, addEquipment } from '../controllers/equipmentcontroller.js';

const router = express.Router();
router.get('/', getEquipment);
router.post('/', addEquipment);

export default router;