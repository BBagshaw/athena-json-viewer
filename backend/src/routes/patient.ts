import express, { Request, Response } from 'express';
import Patient from '../models/patient';

const router = express.Router();

// Get all patients
router.get('/', async (req: Request, res: Response) => {
  try {
    /**
     * Represents a collection of patients.
     * @remarks This variable holds the result of the `Patient.find()` method call, which retrieves all patients from the database.
     */
    const patients = await Patient.find();
    if (patients.length === 0) {
      res.status(404).json({ message: 'No patients found' });
    } else {
      res.json(patients);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});

export default router;