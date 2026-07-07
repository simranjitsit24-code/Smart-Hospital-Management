import express from 'express';
import {
  registerPatient,
  getPatients,
  getPatientById,
  updatePatient,
  dischargePatient,
} from '../controllers/patientController.js';

const router = express.Router();

router.post('/', registerPatient);
router.get('/', getPatients);
router.get('/:patientId', getPatientById);
router.put('/:patientId', updatePatient);
router.put('/:patientId/discharge', dischargePatient);

export default router;