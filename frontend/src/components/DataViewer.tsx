import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { useMsal } from '@azure/msal-react';
import { useTable, useSortBy, Column, HeaderGroup } from 'react-table';
import '../index.css'; // Global styles
import './DataViewer.css';

// Interface for patient details
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

// Interface for patient data
interface PatientData {
  patientdetails: PatientDetails;
  [key: string]: any;
}

// Interface for extended column
interface ExtendedColumn extends HeaderGroup<PatientData> {
  getSortByToggleProps: () => any;
}

/**
 * This file contains the `DataViewer` component, which is responsible for displaying and filtering patient data.
 * It fetches the data from the server, allows searching and filtering based on user input, and provides a table view of the data.
 * The component also handles row click events to show detailed information about a selected patient in a modal.
 */

const DataViewer: React.FC = () => {
  // State variables
  const [data, setData] = useState<PatientData[]>([]); // All patient data
  const [filteredData, setFilteredData] = useState<PatientData[]>([]); // Filtered patient data
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null); // Selected patient
  const [searchTerm, setSearchTerm] = useState(''); // Search term

  // Get the instance from MSAL context
  const { instance } = useMsal();

  // Debounce the search term to avoid frequent updates
  const debouncedSearchTerm = useCallback(
    debounce((nextValue) => {
      setSearchTerm(nextValue);
    }, 300),
    [] // will be created only once initially
  );

  // Handle search input change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the search term which will trigger the effect to filter the data
    debouncedSearchTerm(event.target.value);
  };

  // Fetch data from the server on component mount
  useEffect(() => {
    axios.get('http://localhost:3001/api/patients')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Filter the data based on the search term
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

  // Handle logout
  const handleLogout = () => {
    instance.logoutPopup().catch(e => {
      console.error(e);
    });
  };

  // Handle row click
  const handleRowClick = (patient: PatientData) => {
    setSelectedPatient(patient);
  };

  // Close the modal
  const handleCloseModal = () => {
    setSelectedPatient(null);
  };

  // Handle outside click of the modal
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  // Handle escape key press to close the modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  // Define columns for the table
  const columns: Column<PatientData>[] = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: (row: PatientData) => `${row.patientdetails.firstname} ${row.patientdetails.lastname}`,
        id: 'name',
        Cell: ({ value }) => <span>{value.toLowerCase().replace(/\b\w/g, (c: string) => c.toUpperCase())}</span>,
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
      // Add additional columns here
    ],
    []
  );

  // Use react-table to create table instance
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
          onChange={handleSearch}
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
                          ? <i className="fas fa-sort-down"></i>
                          : <i className="fas fa-sort-up"></i>
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
                {/* Display patient details */}
              </div>
              <div className="modal-section">
                <h3>Medical Information</h3>
                {/* Display medical information */}
              </div>
              <div className="modal-section">
                <h3>Contact Preferences</h3>
                {/* Display contact preferences */}
              </div>
              <div className="modal-section">
                <h3>Guarantor Information</h3>
                {/* Display guarantor information */}
              </div>
              <div className="modal-section">
                <h3>Other Information</h3>
                {/* Display other information */}
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
