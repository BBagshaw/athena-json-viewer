import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useMsal } from '@azure/msal-react';
import { useTable, Column, HeaderGroup, Row, Cell } from 'react-table';
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
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
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

  const columns: Column<PatientData>[] = useMemo(
    () => [
      { Header: 'First Name', accessor: 'FIRSTNAME' },
      { Header: 'Last Name', accessor: 'LASTNAME' },
      { Header: 'DOB', accessor: 'DOB' },
      { Header: 'SSN', accessor: 'SSN' },
      { Header: 'Patient ID', accessor: 'ATHENA_PATIENT_ID' },
      { Header: 'Enterprise ID', accessor: 'ENTERPRISE_ID' },
      { Header: 'Mobile Phone', accessor: 'MOBILE_PHONE' },
      { Header: 'Home Phone', accessor: 'HOME_PHONE' },
      { Header: 'Address', accessor: 'ADDRESS' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<PatientData>({
    columns,
    data: filteredData.slice(currentPage * pageSize, (currentPage + 1) * pageSize),
  });

  const pageCount = Math.ceil(filteredData.length / pageSize);

  return (
    <div className="data-viewer-container">
      <h1 className="header">Patient Data</h1>
      <button className="button" onClick={handleLogout}>Logout</button>
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button className="button" onClick={handleSearch}>Search</button>
      </div>
      <div className="data-content">
        {filteredData.length > 0 ? (
          <>
            <table {...getTableProps()} className="table">
              <thead>
                {headerGroups.map((headerGroup: HeaderGroup<PatientData>, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column: any, colIndex: number) => (
                      <th {...column.getHeaderProps()} key={colIndex}>{column.render('Header')}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row: Row<PatientData>, rowIndex) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={rowIndex}>
                      {row.cells.map((cell: Cell<PatientData>, cellIndex) => (
                        <td {...cell.getCellProps()} key={cellIndex}>{cell.render('Cell')}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="pagination">
              <button onClick={() => setCurrentPage(0)} disabled={currentPage === 0}>
                {'<<'}
              </button>{' '}
              <button onClick={() => setCurrentPage(old => Math.max(old - 1, 0))} disabled={currentPage === 0}>
                {'<'}
              </button>{' '}
              <button onClick={() => setCurrentPage(old => Math.min(old + 1, pageCount - 1))} disabled={currentPage === pageCount - 1}>
                {'>'}
              </button>{' '}
              <button onClick={() => setCurrentPage(pageCount - 1)} disabled={currentPage === pageCount - 1}>
                {'>>'}
              </button>{' '}
              <span>
                Page{' '}
                <strong>
                  {currentPage + 1} of {pageCount}
                </strong>{' '}
              </span>
              <span>
                | Go to page:{' '}
                <input
                  type="number"
                  defaultValue={currentPage + 1}
                  onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    setCurrentPage(page);
                  }}
                  style={{ width: '100px' }}
                />
              </span>{' '}
              <select
                value={pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <p>No data found. Enter a search term and click "Search" to find patient data.</p>
        )}
      </div>
    </div>
  );
};

export default DataViewer;
