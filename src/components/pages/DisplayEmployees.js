import React, { useEffect, useState } from 'react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/employees/') // replace with your actual endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        return response.json();
      })
      .then(data => {
        setEmployees(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Employee ID</th>
            <th>Current Role</th>
            <th>Department</th>
            <th>Start Date</th>
            <th>Left Date</th>
            <th>Duties</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="8">No employees found.</td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.employee_name}</td>
                <td>{emp.employee_id}</td>
                <td>{emp.current_role}</td>
                <td>{emp.department}</td>
                <td>{emp.start_date}</td>
                <td>{emp.left_date || 'N/A'}</td>
                <td>{emp.duties || 'N/A'}</td>
                <td>{emp.company?.company_name || 'N/A'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
