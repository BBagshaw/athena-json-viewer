import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    axios.get('http://localhost:3001/api/patients')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default DataViewer;
