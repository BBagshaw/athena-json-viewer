import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  FIRSTNAME: String,
  LASTNAME: String,
  DOB: String,
  SSN: String,
  ATHENA_PATIENT_ID: String,
  ENTERPRISE_ID: String,
  MOBILE_PHONE: String,
  HOME_PHONE: String,
  ADDRESS: String,
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;