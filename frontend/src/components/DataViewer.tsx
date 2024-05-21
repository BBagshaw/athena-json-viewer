import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMsal } from '@azure/msal-react';
import ReactJson from 'react-json-view';
import './DataViewer.css';

interface PatientData {
  FIRSTNAME: string;
  LASTNAME: string;
  DOB: string;
  SSN: string;
  ATHENA_PATIENT_ID: string;
  ENTERPRISE_ID: string;
  MOBILE_PHONE: string;
  HOME_PHONE: string;
  ADDRESS: string;
}

const DataViewer: React.FC = () => {
  const [data, setData] = useState<PatientData[] | null>(null);
  const { instance } = useMsal();

  useEffect(() => {
    axios.get('http://localhost:3001/api/patients')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleLogout = () => {
    instance.logoutPopup().catch(e => {
      console.error(e);
    });
  };

  return (
    <div className="container">
      <h1 className="header">Patient Data</h1>
      <button className="button" onClick={handleLogout}>Logout</button>
      <div className="data-content">
        {data ? (
          <ReactJson src={data} theme="monokai" />
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default DataViewer;
