import mongoose, { Schema, Document } from 'mongoose';

// Interface for Patient Document
interface IPatient extends Document {
  patientdemographics: {
    maritalstatusname: string;
    lastupdatedby: string;
    contactpreference_announcement_sms: boolean;
    zip: string;
    patientid: string;
    contactpreference_billing_phone: boolean;
    guarantordob: Date;
    ethnicitycodes: string[];
    guarantorcountrycode: string;
    agriculturalworker: string;
    guarantorcountrycode3166: string;
    homebound: boolean;
    lastupdated: Date;
    city: string;
    guarantorrelationshiptopatient: string;
    departmentid: string;
    schoolbasedhealthcenter: string;
    firstname: string;
    contactpreference_billing_sms: boolean;
    portalaccessgiven: boolean;
    confidentialitycode: string;
    portaltermsonfile: boolean;
    publichousing: string;
    ethnicitycode: string;
    language6392code: string;
    contactpreference_lab_sms: boolean;
    guarantoraddress1: string;
    driverslicense: boolean;
    address1: string;
    primaryproviderid: string;
    dob: Date;
    emailexists: boolean;
    primarydepartmentid: string;
    patientphoto: boolean;
    guarantorzip: string;
    maritalstatus: string;
    ssn: string;
    status: string;
    race: string[];
    contactpreference_announcement_email: boolean;
    sex: string;
    contactpreference_lab_email: boolean;
    contactpreference_appointment_email: boolean;
    homephone: string;
    guarantorfirstname: string;
    guarantorstate: string;
    contactpreference_announcement_phone: boolean;
    guarantoraddresssameaspatient: boolean;
    contactpreference_lab_phone: boolean;
    guarantorphone: string;
    balances: {
      balance: number;
      cleanbalance: boolean;
    }[];
    privacyinformationverified: boolean;
    consenttocall: boolean;
    contactpreference_appointment_phone: boolean;
    guarantorssn: string;
    lastname: string;
    contactpreference_billing_email: boolean;
    homeless: string;
    racename: string;
    countrycode3166: string;
    countrycode: string;
    racecode: string;
    state: string;
    caresummarydeliverypreference: string;
    registrationdate: Date;
    firstappointment: Date;
    guarantorcity: string;
    medicationhistoryconsentverified: boolean;
    guarantorlastname: string;
    lastappointment: Date;
    contactpreference_appointment_sms: boolean;
    veteran: string;
  }[];
  patientdetails: {
    state: string;
    lastname: string;
    firstname: string;
    homephone: string;
    zip: string;
    ssn: string;
    enterpriseid: string;
    address1: string;
    dob: Date;
    city: string;
    athenapatientid: string;
  };
}

// Schema for Patient
/**
 * Represents the schema for the Patient collection in the database.
 * This file defines the structure and data types of the Patient document.
 */
const PatientSchema: Schema = new Schema({
  patientdemographics: [{
    maritalstatusname: { type: String }, // Marital status name
    lastupdatedby: { type: String }, // Last updated by
    contactpreference_announcement_sms: { type: Boolean }, // Contact preference for announcement SMS
    zip: { type: String }, // Zip code
    patientid: { type: String }, // Patient ID
    contactpreference_billing_phone: { type: Boolean }, // Contact preference for billing phone
    guarantordob: { type: Date }, // Guarantor date of birth
    ethnicitycodes: [{ type: String }], // Ethnicity codes
    guarantorcountrycode: { type: String }, // Guarantor country code
    agriculturalworker: { type: String }, // Agricultural worker
    guarantorcountrycode3166: { type: String }, // Guarantor country code (ISO 3166)
    homebound: { type: Boolean }, // Homebound
    lastupdated: { type: Date }, // Last updated date
    city: { type: String }, // City
    guarantorrelationshiptopatient: { type: String }, // Guarantor relationship to patient
    departmentid: { type: String }, // Department ID
    schoolbasedhealthcenter: { type: String }, // School-based health center
    firstname: { type: String }, // First name
    contactpreference_billing_sms: { type: Boolean }, // Contact preference for billing SMS
    portalaccessgiven: { type: Boolean }, // Portal access given
    confidentialitycode: { type: String }, // Confidentiality code
    portaltermsonfile: { type: Boolean }, // Portal terms on file
    publichousing: { type: String }, // Public housing
    ethnicitycode: { type: String }, // Ethnicity code
    language6392code: { type: String }, // Language code (ISO 639-2)
    contactpreference_lab_sms: { type: Boolean }, // Contact preference for lab SMS
    guarantoraddress1: { type: String }, // Guarantor address line 1
    driverslicense: { type: Boolean }, // Driver's license
    address1: { type: String }, // Address line 1
    primaryproviderid: { type: String }, // Primary provider ID
    dob: { type: Date }, // Date of birth
    emailexists: { type: Boolean }, // Email exists
    primarydepartmentid: { type: String }, // Primary department ID
    patientphoto: { type: Boolean }, // Patient photo
    guarantorzip: { type: String }, // Guarantor zip code
    maritalstatus: { type: String }, // Marital status
    ssn: { type: String }, // Social Security Number (SSN)
    status: { type: String }, // Status
    race: [{ type: String }], // Race
    contactpreference_announcement_email: { type: Boolean }, // Contact preference for announcement email
    sex: { type: String }, // Sex
    contactpreference_lab_email: { type: Boolean }, // Contact preference for lab email
    contactpreference_appointment_email: { type: Boolean }, // Contact preference for appointment email
    homephone: { type: String }, // Home phone
    guarantorfirstname: { type: String }, // Guarantor first name
    guarantorstate: { type: String }, // Guarantor state
    contactpreference_announcement_phone: { type: Boolean }, // Contact preference for announcement phone
    guarantoraddresssameaspatient: { type: Boolean }, // Guarantor address same as patient
    contactpreference_lab_phone: { type: Boolean }, // Contact preference for lab phone
    guarantorphone: { type: String }, // Guarantor phone
    balances: [{
      balance: { type: Number }, // Balance
      cleanbalance: { type: Boolean } // Clean balance
    }],
    privacyinformationverified: { type: Boolean }, // Privacy information verified
    consenttocall: { type: Boolean }, // Consent to call
    contactpreference_appointment_phone: { type: Boolean }, // Contact preference for appointment phone
    guarantorssn: { type: String }, // Guarantor SSN
    lastname: { type: String }, // Last name
    contactpreference_billing_email: { type: Boolean }, // Contact preference for billing email
    homeless: { type: String }, // Homeless
    racename: { type: String }, // Race name
    countrycode3166: { type: String }, // Country code (ISO 3166)
    countrycode: { type: String }, // Country code
    racecode: { type: String }, // Race code
    state: { type: String }, // State
    caresummarydeliverypreference: { type: String }, // Care summary delivery preference
    registrationdate: { type: Date }, // Registration date
    firstappointment: { type: Date }, // First appointment
    guarantorcity: { type: String }, // Guarantor city
    medicationhistoryconsentverified: { type: Boolean }, // Medication history consent verified
    guarantorlastname: { type: String }, // Guarantor last name
    lastappointment: { type: Date }, // Last appointment
    contactpreference_appointment_sms: { type: Boolean }, // Contact preference for appointment SMS
    veteran: { type: String } // Veteran
  }],
  patientdetails: {
    state: { type: String }, // State
    lastname: { type: String }, // Last name
    firstname: { type: String }, // First name
    homephone: { type: String }, // Home phone
    zip: { type: String }, // Zip code
    ssn: { type: String }, // Social Security Number (SSN)
    enterpriseid: { type: String }, // Enterprise ID
    address1: { type: String }, // Address line 1
    dob: { type: Date }, // Date of birth
    city: { type: String }, // City
    athenapatientid: { type: String } // Athena patient ID
  }
});

export default mongoose.model<IPatient>('Patient', PatientSchema);
