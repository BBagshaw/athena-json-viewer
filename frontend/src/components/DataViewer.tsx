import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMsal } from '@azure/msal-react';
import { useTable, useSortBy, Column, HeaderGroup } from 'react-table';
import './DataViewer.css';

interface PatientData {
  patientdetails: {
    firstname: string;
    lastname: string;
    dob: string;
    ssn: string;
    athenapatientid: string;
    address1: string;
    homephone: string;
    city: string;
    state: string;
  };
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
          `${patient.patientdetails.firstname} ${patient.patientdetails.lastname}`.toLowerCase().includes(lowerCaseSearchTerm) ||
          patient.patientdetails.athenapatientid.toLowerCase().includes(lowerCaseSearchTerm) ||
          patient.patientdetails.ssn.toLowerCase().includes(lowerCaseSearchTerm)
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

  const tableInstance = useTable({ columns, data: filteredData }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <div>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
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
      <button className="button" onClick={handleLogout}>Logout</button>
      {selectedPatient && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Additional Information</h2>
            <p>Name: {`${selectedPatient.patientdetails.firstname} ${selectedPatient.patientdetails.lastname}`}</p>
            <p>Date of Birth: {new Date(selectedPatient.patientdetails.dob).toLocaleDateString()}</p>
            {/* Add more fields as needed */}
            <button className="button" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataViewer;
