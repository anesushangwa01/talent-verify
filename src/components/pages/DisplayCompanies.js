import React, { useEffect, useState } from 'react';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/companies/')
      .then(response => response.json())
      .then(data => setCompanies(data))
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  return (
    <div>
      <h2>Company List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Register Number</th>
            <th>Register Date</th>
            <th>Address</th>
            <th>Contact Person</th>
            <th>No. of Employees</th>
            <th>Email</th>
            <th>Departments</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.company_name}</td>
              <td>{company.register_number}</td>
              <td>{company.register_date}</td>
              <td>{company.company_address}</td>
              <td>{company.contact_person}</td>
              <td>{company.number_of_employees}</td>
              <td>{company.email}</td>
              <td>{company.departments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
