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

export default router;
