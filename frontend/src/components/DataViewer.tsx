import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMsal } from '@azure/msal-react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import './DataViewer.css';

interface PatientData {
  id: string;
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
  const [data, setData] = useState<PatientData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredData, setFilteredData] = useState<PatientData[]>([]);
  const { instance } = useMsal();

  useEffect(() => {
    axios.get('http://localhost:3001/api/patients')
      .then(response => {
        setData(response.data.map((item: any, index: number) => ({ ...item, id: index.toString() })));
        setFilteredData(response.data.map((item: any, index: number) => ({ ...item, id: index.toString() })));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleLogout = () => {
    instance.logoutPopup().catch(e => {
      console.error(e);
    });
  };

  const handleSearch = () => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = data.filter(patient => {
      return Object.keys(patient).some(key => {
        const value = (patient as any)[key];
        return value.toString().toLowerCase().includes(lowercasedFilter);
      });
    });
    setFilteredData(filtered);
  };

  const columns: GridColDef[] = [
    { field: 'FIRSTNAME', headerName: 'First Name', width: 150 },
    { field: 'LASTNAME', headerName: 'Last Name', width: 150 },
    { field: 'DOB', headerName: 'DOB', width: 150 },
    { field: 'SSN', headerName: 'SSN', width: 150 },
    { field: 'ATHENA_PATIENT_ID', headerName: 'Patient ID', width: 150 },
    { field: 'ENTERPRISE_ID', headerName: 'Enterprise ID', width: 150 },
    { field: 'MOBILE_PHONE', headerName: 'Mobile Phone', width: 150 },
    { field: 'HOME_PHONE', headerName: 'Home Phone', width: 150 },
    { field: 'ADDRESS', headerName: 'Address', width: 200 },
  ];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Archive Access</h2>
        </div>
        <nav className="sidebar-nav">
          <a href="#">Dashboard</a>
          <a href="#">Search Patients</a>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <h1>Welcome, User!</h1>
          <div className="header-right">
            <button className="button" onClick={handleLogout}>Logout</button>
          </div>
        </header>
        <div className="search-bar-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter search term..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className="button" onClick={handleSearch}>Search</button>
        </div>
        <div className="data-content" style={{ height: 600, width: '90%' }}>
          <DataGrid rows={filteredData} columns={columns} autoPageSize={false} />
        </div>
      </main>
    </div>
  );
};

export default DataViewer;
