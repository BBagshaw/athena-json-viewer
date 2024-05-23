import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Patient from './models/patient';
import sampleData from './sampleData.json';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/athena').then(async () => {
  console.log('Connected to MongoDB');
  
  // Clear existing data
  await Patient.deleteMany({});
  
  // Insert sample data
  await Patient.insertMany(sampleData);
  console.log('Sample data inserted');
  
  mongoose.connection.close();
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});
