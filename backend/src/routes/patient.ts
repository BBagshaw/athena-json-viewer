import express, { Request, Response } from 'express';
import Patient from '../models/patient';

const router = express.Router();

// Get all patients
router.get('/', async (req: Request, res: Response) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});

// Add a new patient
router.post('/', async (req: Request, res: Response) => {
  const patient = new Patient(req.body);

  try {
    const newPatient = await patient.save();
    res.status(201).json(newPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
});

export default router;
