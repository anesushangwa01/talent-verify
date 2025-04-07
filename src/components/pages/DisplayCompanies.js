import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to track fetching status

  // Fetch companies from the server
  useEffect(() => {
    setLoading(true); // Set loading to true when fetch starts
    fetch('http://127.0.0.1:8000/companies/')
      .then(response => response.json())
      .then(data => {
        setCompanies(data); // Update companies data once fetched
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Error fetching companies:', error);
        setLoading(false); // Set loading to false even if there is an error
      });
  }, []);

  // Handle delete action
  const deleteCompany = async (id) => {
    if (!window.confirm('Are you sure you want to delete this company?')) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/companies/${id}/delete/`, {
        method: 'DELETE',
      });
      if (res.ok) {
        alert('Company deleted');
        // Remove the deleted company from the list (optimistic update)
        setCompanies(companies.filter(company => company.id !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="container my-4">
      {/* Centered Search Bar */}
      <div className="d-flex justify-content-center mb-3">
        <input
          type="text"
          placeholder="search company"
          className="form-control rounded-pill px-3 py-2 bg-light border-0 small"
          style={{ maxWidth: "300px" }}
        />
      </div>

      {/* Heading */}
      <h5 className="fw-semibold">Companies</h5>
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
          {/* Responsive Table */}
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Company Name</th>
                <th>Register Number</th>
                <th>Register Date</th>
                <th>Address</th>
                <th>Contact Person</th>
                <th>No. of Employees</th>
                <th>Email</th>
                <th>Departments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center text-muted">
                    No companies found.
                  </td>
                </tr>
              ) : (
                companies.map((company) => (
                  <tr key={company.id}>
                    <td>{company.company_name}</td>
                    <td>{company.register_number}</td>
                    <td>{company.register_date}</td>
                    <td>{company.company_address}</td>
                    <td>{company.contact_person}</td>
                    <td>{company.number_of_employees}</td>
                    <td>{company.email}</td>
                    <td>{company.departments}</td>
                    <td>
                      <div className="d-flex">
                        <Link to={`/edit-company/${company.id}`} className="btn btn-success btn-sm me-2">
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteCompany(company.id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </div>
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

export default CompanyList;
