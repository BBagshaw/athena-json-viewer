import { Schema, model, Document } from 'mongoose';

interface EmergencyContact {
  NAME: string;
  RELATIONSHIP: string;
  PHONE: string;
}

interface Patient extends Document {
  FIRSTNAME: string;
  LASTNAME: string;
  DOB: Date;
  SSN: string;
  ATHENA_PATIENT_ID: string;
  ENTERPRISE_ID: string;
  MOBILE_PHONE: string;
  HOME_PHONE: string;
  ADDRESS: string;
  EMAIL?: string;
  GENDER?: string;
  MARITAL_STATUS?: string;
  RACE?: string;
  ETHNICITY?: string;
  PREFERRED_LANGUAGE?: string;
  EMERGENCY_CONTACT?: EmergencyContact;
  ALLERGIES?: any[];
  ASSESSMENT_AND_PLAN?: any[];
  CANCER_CASES?: any[];
  CARE_PLAN?: any[];
  CARE_TEAM_MEMBERS?: any[];
  CHART_ALERT?: any[];
  CHIEF_COMPLAINT?: any[];
  CLINICAL_DOCUMENTS?: any[];
  CORRECTIVE_LENS?: any[];
  DEFAULT_CLINICAL_PROVIDERS?: any[];
  DEVICES_OR_MEDICAL_EQUIPMENT?: any[];
  DME_ORDERS?: any[];
  ENCOUNTER_DOCUMENTS?: any[];
  ENCOUNTERS?: any[];
  FAMILY_HISTORY?: any[];
  GOALS?: any[];
  GYN_HISTORY?: any[];
  HEALTH_CONCERNS?: any[];
  HISTORY_OF_PRESENT_ILLNESS?: any[];
  IMAGING_RESULTS?: any[];
  IMMUNIZATIONS?: any[];
  LAB_RESULTS?: any[];
  MEDICAL_RECORD_DOCUMENTS?: any[];
  MEDICATIONS?: any[];
  OBSERVATIONS?: any[];
  ORDERS?: any[];
  PAST_MEDICAL_HISTORY?: any[];
  PHYSICAL_EXAM?: any[];
  PROCEDURES?: any[];
  REVIEW_OF_SYSTEMS?: any[];
  SOCIAL_HISTORY?: any[];
  SURGICAL_HISTORY?: any[];
  VITALS?: any[];
}

const emergencyContactSchema = new Schema<EmergencyContact>({
  NAME: { type: String, required: true },
  RELATIONSHIP: { type: String, required: true },
  PHONE: { type: String, required: true }
});

const patientSchema = new Schema<Patient>({
  FIRSTNAME: { type: String, required: true },
  LASTNAME: { type: String, required: true },
  DOB: { type: Date, required: true },
  SSN: { type: String, required: true },
  ATHENA_PATIENT_ID: { type: String, required: true },
  ENTERPRISE_ID: { type: String, required: true },
  MOBILE_PHONE: { type: String, required: true },
  HOME_PHONE: { type: String, required: true },
  ADDRESS: { type: String, required: true },
  EMAIL: { type: String },
  GENDER: { type: String },
  MARITAL_STATUS: { type: String },
  RACE: { type: String },
  ETHNICITY: { type: String },
  PREFERRED_LANGUAGE: { type: String },
  EMERGENCY_CONTACT: { type: emergencyContactSchema },
  ALLERGIES: [{ type: Schema.Types.Mixed }],
  ASSESSMENT_AND_PLAN: [{ type: Schema.Types.Mixed }],
  CANCER_CASES: [{ type: Schema.Types.Mixed }],
  CARE_PLAN: [{ type: Schema.Types.Mixed }],
  CARE_TEAM_MEMBERS: [{ type: Schema.Types.Mixed }],
  CHART_ALERT: [{ type: Schema.Types.Mixed }],
  CHIEF_COMPLAINT: [{ type: Schema.Types.Mixed }],
  CLINICAL_DOCUMENTS: [{ type: Schema.Types.Mixed }],
  CORRECTIVE_LENS: [{ type: Schema.Types.Mixed }],
  DEFAULT_CLINICAL_PROVIDERS: [{ type: Schema.Types.Mixed }],
  DEVICES_OR_MEDICAL_EQUIPMENT: [{ type: Schema.Types.Mixed }],
  DME_ORDERS: [{ type: Schema.Types.Mixed }],
  ENCOUNTER_DOCUMENTS: [{ type: Schema.Types.Mixed }],
  ENCOUNTERS: [{ type: Schema.Types.Mixed }],
  FAMILY_HISTORY: [{ type: Schema.Types.Mixed }],
  GOALS: [{ type: Schema.Types.Mixed }],
  GYN_HISTORY: [{ type: Schema.Types.Mixed }],
  HEALTH_CONCERNS: [{ type: Schema.Types.Mixed }],
  HISTORY_OF_PRESENT_ILLNESS: [{ type: Schema.Types.Mixed }],
  IMAGING_RESULTS: [{ type: Schema.Types.Mixed }],
  IMMUNIZATIONS: [{ type: Schema.Types.Mixed }],
  LAB_RESULTS: [{ type: Schema.Types.Mixed }],
  MEDICAL_RECORD_DOCUMENTS: [{ type: Schema.Types.Mixed }],
  MEDICATIONS: [{ type: Schema.Types.Mixed }],
  OBSERVATIONS: [{ type: Schema.Types.Mixed }],
  ORDERS: [{ type: Schema.Types.Mixed }],
  PAST_MEDICAL_HISTORY: [{ type: Schema.Types.Mixed }],
  PHYSICAL_EXAM: [{ type: Schema.Types.Mixed }],
  PROCEDURES: [{ type: Schema.Types.Mixed }],
  REVIEW_OF_SYSTEMS: [{ type: Schema.Types.Mixed }],
  SOCIAL_HISTORY: [{ type: Schema.Types.Mixed }],
  SURGICAL_HISTORY: [{ type: Schema.Types.Mixed }],
  VITALS: [{ type: Schema.Types.Mixed }]
});

const Patient = model<Patient>('Patient', patientSchema);

export default Patient;
