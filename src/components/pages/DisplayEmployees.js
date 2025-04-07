import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]); // State to store employees data
  const [loading, setLoading] = useState(true); // Loading state to track fetching status

  // Fetch employees from the server
  const fetchEmployees = () => {
    setLoading(true); // Set loading to true when the fetch starts
    fetch('http://127.0.0.1:8000/employees/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        return response.json();
      })
      .then(data => {
        setEmployees(data); // Update employees data once fetched
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false); // Set loading to false even if there is an error
      });
  };

  useEffect(() => {
    fetchEmployees(); // Call fetchEmployees when component mounts
  }, []);

  // Handle delete action
  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    fetch(`http://127.0.0.1:8000/employees/${id}/`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.status === 204) {
          setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== id));
        } else {
          throw new Error('Failed to delete employee');
        }
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
      });
  };

  return (
    <div className="container my-4">
      {/* Search Input Centered */}
      <div className="d-flex justify-content-center mb-3">
        <input
          type="text"
          placeholder="search employee"
          className="form-control rounded-pill px-3 py-2 bg-light border-0 small"
          style={{ maxWidth: "300px" }}
        />
      </div>

      {/* Header */}
      <h5 className="fw-semibold">Employees</h5>
      <hr />

      {/* Loading Spinner */}
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          {/* Responsive Bootstrap Table */}
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Employee Name</th>
                <th>Employee ID</th>
                <th>Current Role</th>
                <th>Department</th>
                <th>Start Date</th>
                <th>Left Date</th>
                <th>Duties</th>
                <th>Company</th>
                <th>Act</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center text-muted">
                    No employees found.
                  </td>
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
                    <td>{emp.company_name || 'N/A'}</td>
                    <td>
                      <Link to={`/employee/${emp.id}`} className="btn btn-success btn-sm me-2">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
