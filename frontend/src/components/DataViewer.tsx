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
  const [data, setData] = useState<PatientData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredData, setFilteredData] = useState<PatientData[]>([]);
  const { instance } = useMsal();

  useEffect(() => {
    axios.get('http://localhost:3001/api/patients')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
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
        <div className="data-content">
          {filteredData.length > 0 ? (
            <ReactJson src={filteredData} theme="monokai" />
          ) : (
            <p>No data found. Enter a search term and click "Search" to find patient data.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default DataViewer;
