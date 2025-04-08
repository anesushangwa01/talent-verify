import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';

const AddEmployeeForm = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate for navigation after form submission
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [companies, setCompanies] = useState([]); // State for companies list
  const [ setEmployeeData] = useState(null); // State for employee data (for editing)
  const [loading, setLoading] = useState(false); // State to track loading

  // Fetch companies and employee data if in edit mode
  useEffect(() => {
    // Fetch companies list
    fetch('http://127.0.0.1:8000/companies/')
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error('Error fetching companies:', err));

    if (id) {
      // Fetch employee data for editing
      fetch(`http://127.0.0.1:8000/employees/${id}/`)
        .then((res) => res.json())
        .then((data) => {
          setEmployeeData(data);
          reset(data); // Pre-populate form with employee data
        })
        .catch((err) => console.error('Error fetching employee data:', err));
    }
  }, [id, reset]);

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true); // Start loading

    try {
      const method = id ? 'PUT' : 'POST'; // Choose method based on edit or add
      const url = id
        ? `http://127.0.0.1:8000/employees/${id}/update/`
        : 'http://127.0.0.1:8000/add-employee/';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit employee');
      }

      const result = await response.json();
      console.log('Employee data saved:', result);

      // After successful submission, navigate to employee list
      navigate('/displayemployees');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container my-5">
      <h5 className="mb-3 border-bottom pb-2">{id ? 'Edit Employee' : 'Add Employee'}</h5>
      
      <div className="card p-4 mx-auto" style={{ maxWidth: "400px", backgroundColor: "#f9f9f1", borderRadius: "10px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Company selection */}
          <div className="mb-3">
            <label className="form-label">Company</label>
            <select className="form-control" {...register('company', { required: 'Company is required' })}>
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.company_name}
                </option>
              ))}
            </select>
            {errors.company && <span className="text-danger small">{errors.company.message}</span>}
          </div>

          {/* Employee Name */}
          <div className="mb-3">
            <label className="form-label">Employee Name</label>
            <input className="form-control" {...register('employee_name', { required: 'Name is required' })} />
            {errors.employee_name && <span className="text-danger small">{errors.employee_name.message}</span>}
          </div>

          {/* Employee ID */}
          <div className="mb-3">
            <label className="form-label">Employee ID</label>
            <input
              className="form-control"
              {...register('employee_id', {
                required: 'ID is required',
                pattern: {
                  value: /^[A-Za-z0-9]+$/,
                  message: 'Only letters and numbers allowed',
                },
              })}
            />
            {errors.employee_id && <span className="text-danger small">{errors.employee_id.message}</span>}
          </div>

          {/* Current Role */}
          <div className="mb-3">
            <label className="form-label">Current Role</label>
            <input className="form-control" {...register('current_role', { required: 'Role is required' })} />
            {errors.current_role && <span className="text-danger small">{errors.current_role.message}</span>}
          </div>

          {/* Department */}
          <div className="mb-3">
            <label className="form-label">Department</label>
            <select className="form-control" {...register('department', { required: 'Department is required' })}>
              <option value="">Select Department</option>
              <option value="HR">Human Resources</option>
              <option value="IT">Information Technology</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
            </select>
            {errors.department && <span className="text-danger small">{errors.department.message}</span>}
          </div>

          {/* Start Date */}
          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              {...register('start_date', { required: 'Start date is required' })}
            />
            {errors.start_date && <span className="text-danger small">{errors.start_date.message}</span>}
          </div>

          {/* Left Date */}
          <div className="mb-3">
            <label className="form-label">Left Date</label>
            <input type="date" className="form-control" {...register('left_date')} />
          </div>

          {/* Duties */}
          <div className="mb-3">
            <label className="form-label">Duties</label>
            <textarea rows="4" className="form-control" {...register('duties')} />
          </div>

          {/* Submit Button */}
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-success px-4 py-2" disabled={loading}>
              {loading ? 'Submitting...' : id ? 'Update Employee' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
