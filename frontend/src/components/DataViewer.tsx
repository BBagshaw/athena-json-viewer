import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { useMsal } from '@azure/msal-react';
import { useTable, useSortBy, Column, HeaderGroup } from 'react-table';
import '../index.css'; // Global styles
import './DataViewer.css';

interface PatientDetails {
  firstname: string;
  lastname: string;
  dob: string;
  ssn: string;
  athenapatientid: string;
  address1: string;
  homephone: string;
  city: string;
  state: string;
  [key: string]: any;
}

interface PatientData {
  patientdetails: PatientDetails;
  [key: string]: any;
}

interface ExtendedColumn extends HeaderGroup<PatientData> {
  getSortByToggleProps: () => any;
}

const DataViewer: React.FC = () => {
  const [data, setData] = useState<PatientData[]>([]);
  const [filteredData, setFilteredData] = useState<PatientData[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { instance } = useMsal();

  useEffect(() => {
    axios.get('http://localhost:3001/api/patients')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (data) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      setFilteredData(
        data.filter(patient =>
          (patient.patientdetails.firstname && patient.patientdetails.firstname.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (patient.patientdetails.lastname && patient.patientdetails.lastname.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (patient.patientdetails.athenapatientid && patient.patientdetails.athenapatientid.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (patient.patientdetails.ssn && patient.patientdetails.ssn.toLowerCase().includes(lowerCaseSearchTerm))
        )
      );
    }
  }, [searchTerm, data]);

  const handleLogout = () => {
    instance.logoutPopup().catch(e => {
      console.error(e);
    });
  };

  const handleRowClick = (patient: PatientData) => {
    setSelectedPatient(patient);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
  };

  const columns: Column<PatientData>[] = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: (row: PatientData) => `${row.patientdetails.firstname} ${row.patientdetails.lastname}`,
        id: 'name',
      },
      {
        Header: 'Date of Birth',
        accessor: (row: PatientData) => new Date(row.patientdetails.dob).toLocaleDateString(),
        id: 'dob',
      },
      {
        Header: 'Athena Patient ID',
        accessor: 'patientdetails.athenapatientid',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: filteredData }, useSortBy);

  return (
    <div className="container">
      <div className="sidebar">
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="main-content">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: HeaderGroup<PatientData>) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} onClick={() => handleRowClick(row.original)}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {selectedPatient && (
          <div className="modal" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Patient Information</h2>
              <div className="modal-section">
                <h3>Personal Information</h3>
                <p>First Name: {selectedPatient.patientdetails.firstname}</p>
                <p>Last Name: {selectedPatient.patientdetails.lastname}</p>
                <p>Date of Birth: {new Date(selectedPatient.patientdetails.dob).toLocaleDateString()}</p>
                <p>Sex: {selectedPatient.patientdetails.sex}</p>
                <p>SSN: {selectedPatient.patientdetails.ssn}</p>
                <p>Marital Status: {selectedPatient.patientdetails.maritalstatusname}</p>
                <p>Race: {selectedPatient.patientdetails.race}</p>
                <p>Race Name: {selectedPatient.patientdetails.racename}</p>
                <p>Ethnicity Code: {selectedPatient.patientdetails.ethnicitycode}</p>
                <p>Home Phone: {selectedPatient.patientdetails.homephone}</p>
                <p>Address: {selectedPatient.patientdetails.address1}, {selectedPatient.patientdetails.city}, {selectedPatient.patientdetails.state} {selectedPatient.patientdetails.zip}</p>
                <p>Country Code: {selectedPatient.patientdetails.countrycode}</p>
              </div>
              <div className="modal-section">
                <h3>Medical Information</h3>
                <p>Primary Provider ID: {selectedPatient.patientdetails.primaryproviderid}</p>
                <p>Primary Department ID: {selectedPatient.patientdetails.primarydepartmentid}</p>
                <p>Last Appointment: {selectedPatient.patientdetails.lastappointment}</p>
                <p>First Appointment: {selectedPatient.patientdetails.firstappointment}</p>
                <p>Registration Date: {selectedPatient.patientdetails.registrationdate}</p>
                <p>Department ID: {selectedPatient.patientdetails.departmentid}</p>
                <p>Medication History Consent Verified: {selectedPatient.patientdetails.medicationhistoryconsentverified}</p>
                <p>Patient Photo: <img src={selectedPatient.patientdetails.patientphoto} alt="Patient" /></p>
              </div>
              <div className="modal-section">
                <h3>Contact Preferences</h3>
                <p>Announcement SMS: {selectedPatient.patientdetails.contactpreference_announcement_sms}</p>
                <p>Billing Phone: {selectedPatient.patientdetails.contactpreference_billing_phone}</p>
                <p>Billing SMS: {selectedPatient.patientdetails.contactpreference_billing_sms}</p>
                <p>Announcement Email: {selectedPatient.patientdetails.contactpreference_announcement_email}</p>
                <p>Lab Email: {selectedPatient.patientdetails.contactpreference_lab_email}</p>
                <p>Appointment Email: {selectedPatient.patientdetails.contactpreference_appointment_email}</p>
                <p>Announcement Phone: {selectedPatient.patientdetails.contactpreference_announcement_phone}</p>
                <p>Lab Phone: {selectedPatient.patientdetails.contactpreference_lab_phone}</p>
                <p>Appointment Phone: {selectedPatient.patientdetails.contactpreference_appointment_phone}</p>
                <p>Billing Email: {selectedPatient.patientdetails.contactpreference_billing_email}</p>
                <p>Appointment SMS: {selectedPatient.patientdetails.contactpreference_appointment_sms}</p>
              </div>
              <div className="modal-section">
                <h3>Guarantor Information</h3>
                <p>Guarantor First Name: {selectedPatient.patientdetails.guarantorfirstname}</p>
                <p>Guarantor Last Name: {selectedPatient.patientdetails.guarantorlastname}</p>
                <p>Guarantor Date of Birth: {new Date(selectedPatient.patientdetails.guarantordob).toLocaleDateString()}</p>
                <p>Guarantor SSN: {selectedPatient.patientdetails.guarantorssn}</p>
                <p>Guarantor Phone: {selectedPatient.patientdetails.guarantorphone}</p>
                <p>Guarantor Address: {selectedPatient.patientdetails.guarantoraddress1}, {selectedPatient.patientdetails.guarantorcity}, {selectedPatient.patientdetails.guarantorstate} {selectedPatient.patientdetails.guarantorzip}</p>
                <p>Guarantor Country Code: {selectedPatient.patientdetails.guarantorcountrycode}</p>
                <p>Relationship to Patient: {selectedPatient.patientdetails.guarantorrelationshiptopatient}</p>
                <p>Address Same as Patient: {selectedPatient.patientdetails.guarantoraddresssameaspatient}</p>
              </div>
              <div className="modal-section">
                <h3>Other Information</h3>
                <p>Patient ID: {selectedPatient.patientdetails.patientid}</p>
                <p>Last Updated By: {selectedPatient.patientdetails.lastupdatedby}</p>
                <p>Last Updated: {selectedPatient.patientdetails.lastupdated}</p>
                <p>Agricultural Worker: {selectedPatient.patientdetails.agriculturalworker}</p>
                <p>Homebound: {selectedPatient.patientdetails.homebound}</p>
                <p>School-Based Health Center: {selectedPatient.patientdetails.schoolbasedhealthcenter}</p>
                <p>Portal Access Given: {selectedPatient.patientdetails.portalaccessgiven}</p>
                <p>Confidentiality Code: {selectedPatient.patientdetails.confidentialitycode}</p>
                <p>Portal Terms on File: {selectedPatient.patientdetails.portaltermsonfile}</p>
                <p>Public Housing: {selectedPatient.patientdetails.publichousing}</p>
                <p>Language Code: {selectedPatient.patientdetails.language6392code}</p>
                <p>Driver's License: {selectedPatient.patientdetails.driverslicense}</p>
                <p>Email Exists: {selectedPatient.patientdetails.emailexists}</p>
                <p>Status: {selectedPatient.patientdetails.status}</p>
                <p>Balances: {selectedPatient.patientdetails.balances}</p>
                <p>Privacy Information Verified: {selectedPatient.patientdetails.privacyinformationverified}</p>
                <p>Consent to Call: {selectedPatient.patientdetails.consenttocall}</p>
                <p>Homeless: {selectedPatient.patientdetails.homeless}</p>
                <p>Care Summary Delivery Preference: {selectedPatient.patientdetails.caresummarydeliverypreference}</p>
                <p>Veteran: {selectedPatient.patientdetails.veteran}</p>
              </div>
              <button className="button" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataViewer;
