import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import patientRoutes from './routes/patient';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ehi_viewer')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Use routes
app.use('/api', patientRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
