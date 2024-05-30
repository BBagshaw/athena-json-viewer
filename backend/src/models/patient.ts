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
const PatientSchema: Schema = new Schema({
  patientdemographics: [{
    maritalstatusname: { type: String },
    lastupdatedby: { type: String },
    contactpreference_announcement_sms: { type: Boolean },
    zip: { type: String },
    patientid: { type: String },
    contactpreference_billing_phone: { type: Boolean },
    guarantordob: { type: Date },
    ethnicitycodes: [{ type: String }],
    guarantorcountrycode: { type: String },
    agriculturalworker: { type: String },
    guarantorcountrycode3166: { type: String },
    homebound: { type: Boolean },
    lastupdated: { type: Date },
    city: { type: String },
    guarantorrelationshiptopatient: { type: String },
    departmentid: { type: String },
    schoolbasedhealthcenter: { type: String },
    firstname: { type: String },
    contactpreference_billing_sms: { type: Boolean },
    portalaccessgiven: { type: Boolean },
    confidentialitycode: { type: String },
    portaltermsonfile: { type: Boolean },
    publichousing: { type: String },
    ethnicitycode: { type: String },
    language6392code: { type: String },
    contactpreference_lab_sms: { type: Boolean },
    guarantoraddress1: { type: String },
    driverslicense: { type: Boolean },
    address1: { type: String },
    primaryproviderid: { type: String },
    dob: { type: Date },
    emailexists: { type: Boolean },
    primarydepartmentid: { type: String },
    patientphoto: { type: Boolean },
    guarantorzip: { type: String },
    maritalstatus: { type: String },
    ssn: { type: String },
    status: { type: String },
    race: [{ type: String }],
    contactpreference_announcement_email: { type: Boolean },
    sex: { type: String },
    contactpreference_lab_email: { type: Boolean },
    contactpreference_appointment_email: { type: Boolean },
    homephone: { type: String },
    guarantorfirstname: { type: String },
    guarantorstate: { type: String },
    contactpreference_announcement_phone: { type: Boolean },
    guarantoraddresssameaspatient: { type: Boolean },
    contactpreference_lab_phone: { type: Boolean },
    guarantorphone: { type: String },
    balances: [{
      balance: { type: Number },
      cleanbalance: { type: Boolean }
    }],
    privacyinformationverified: { type: Boolean },
    consenttocall: { type: Boolean },
    contactpreference_appointment_phone: { type: Boolean },
    guarantorssn: { type: String },
    lastname: { type: String },
    contactpreference_billing_email: { type: Boolean },
    homeless: { type: String },
    racename: { type: String },
    countrycode3166: { type: String },
    countrycode: { type: String },
    racecode: { type: String },
    state: { type: String },
    caresummarydeliverypreference: { type: String },
    registrationdate: { type: Date },
    firstappointment: { type: Date },
    guarantorcity: { type: String },
    medicationhistoryconsentverified: { type: Boolean },
    guarantorlastname: { type: String },
    lastappointment: { type: Date },
    contactpreference_appointment_sms: { type: Boolean },
    veteran: { type: String }
  }],
  patientdetails: {
    state: { type: String },
    lastname: { type: String },
    firstname: { type: String },
    homephone: { type: String },
    zip: { type: String },
    ssn: { type: String },
    enterpriseid: { type: String },
    address1: { type: String },
    dob: { type: Date },
    city: { type: String },
    athenapatientid: { type: String }
  }
});

export default mongoose.model<IPatient>('Patient', PatientSchema);
