import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import patientRoutes from './routes/patient';

/**
 * This file is the server implementation for the Athena JSON Viewer backend.
 * It sets up an Express server, connects to MongoDB, and defines routes for handling patient data.
 */


dotenv.config(); // Load .env variables

const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(json()); // Parse JSON bodies
app.use(urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use('/api/patients', patientRoutes); // Mount patient routes at '/api/patients'

mongoose.connect(process.env.MONGODB_URI || '').then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});
