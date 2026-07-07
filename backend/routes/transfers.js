import express from 'express';
import { createTransfer, getPatientTimeline } from '../controllers/transferController.js';

const router = express.Router();

router.post('/', createTransfer);
router.get('/timeline/:patientId', getPatientTimeline);

export default router;