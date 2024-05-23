import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import patientRoutes from './routes/patient';

dotenv.config(); // Make sure this line is present to load .env variables

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/patients', patientRoutes);

mongoose.connect(process.env.MONGODB_URI || '').then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});
