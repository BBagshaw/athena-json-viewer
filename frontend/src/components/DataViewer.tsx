import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMsal } from '@azure/msal-react';
import './DataViewer.css';

interface PatientData {
  FIRSTNAME: string;
  LASTNAME: string;
  DOB: string;
  SSN: string;
  ATHENA_PATIENT_ID: string;
  [key: string]: any; // Allow any additional properties
}

const DataViewer: React.FC = () => {
  const [data, setData] = useState<PatientData[] | null>(null);
  const [filteredData, setFilteredData] = useState<PatientData[] | null>(null);
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
      setFilteredData(
        data.filter(patient =>
          `${patient.FIRSTNAME} ${patient.LASTNAME}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.ATHENA_PATIENT_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.SSN.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="container">
      <div className="header">
        <h1>EHI Viewer</h1>
      </div>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by name, Athena patient ID, or SSN..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="data-content">
        {filteredData ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Athena Patient ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((patient, index) => (
                <tr key={index} onClick={() => handleRowClick(patient)}>
                  <td>{patient.FIRSTNAME} {patient.LASTNAME}</td>
                  <td>{new Date(patient.DOB).toLocaleDateString()}</td>
                  <td>{patient.ATHENA_PATIENT_ID}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
      {selectedPatient && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedPatient.FIRSTNAME} {selectedPatient.LASTNAME}</h2>
            <p><strong>Date of Birth:</strong> {new Date(selectedPatient.DOB).toLocaleDateString()}</p>
            <p><strong>Athena Patient ID:</strong> {selectedPatient.ATHENA_PATIENT_ID}</p>
            {Object.entries(selectedPatient).map(([key, value]) => (
              key !== 'FIRSTNAME' && key !== 'LASTNAME' && key !== 'DOB' && key !== 'ATHENA_PATIENT_ID' && (
                <p key={key}><strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}</p>
              )
            ))}
            <button className="button" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
      <button className="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DataViewer;
