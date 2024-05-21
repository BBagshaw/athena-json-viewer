import express from 'express';
import Patient from '../models/patient';

const router = express.Router();

// Get all patients
router.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
});

// Add a new patient
router.post('/patients', async (req, res) => {
  const patient = new Patient(req.body);
  try {
    const newPatient = await patient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
});

export default router;
