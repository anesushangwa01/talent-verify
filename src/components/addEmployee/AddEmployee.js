import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = 'https://talentverifybackend.onrender.com'; // for production
// const BASE_URL = 'http://127.0.0.1:8000';  // for local development

const AddEmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState({});

  useEffect(() => {
    // Fetch companies
    fetch(`${BASE_URL}/companies/`)
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error('Error fetching companies:', err));

    // Fetch employee if editing
    if (id) {
      setLoading(true);
      fetch(`${BASE_URL}/employees/${id}/`)
        .then((res) => res.json())
        .then((data) => {
          reset(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching employee data:', err);
          setLoading(false);
        });
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    setServerErrors({}); // clear previous server errors

    const method = id ? 'PUT' : 'POST';
    const url = id
      ? `${BASE_URL}/employees/${id}/update/`
      : `${BASE_URL}/add-employee/`;

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerErrors(result); // Set errors to state if the response isn't OK
        return;
      }

      console.log('Saved:', result);
      navigate('/displayemployees');
      reset(); // Clear form after successful submission
    } catch (error) {
      alert('An unexpected error occurred. Please try again.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <h5 className="mb-3 border-bottom pb-2">{id ? 'Edit Employee' : 'Add Employee'}</h5>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="card p-4 mx-auto" style={{ maxWidth: '500px', backgroundColor: '#f9f9f1', borderRadius: '10px' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Company */}
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
              {(errors.company || serverErrors.company) && (
                <span className="text-danger small">
                  {serverErrors.company ? serverErrors.company[0] : errors.company?.message}
                </span>
              )}
            </div>

            {/* Employee Name */}
            <div className="mb-3">
              <label className="form-label">Employee Name</label>
              <input className="form-control" {...register('employee_name', { required: 'Name is required' })} />
              {(errors.employee_name || serverErrors.employee_name) && (
                <span className="text-danger small">
                  {serverErrors.employee_name ? serverErrors.employee_name[0] : errors.employee_name?.message}
                </span>
              )}
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
              {(errors.employee_id || serverErrors.employee_id) && (
                <span className="text-danger small">
                  {serverErrors.employee_id ? serverErrors.employee_id[0] : errors.employee_id?.message}
                </span>
              )}
            </div>

            {/* Current Role */}
            <div className="mb-3">
              <label className="form-label">Current Role</label>
              <input className="form-control" {...register('current_role', { required: 'Role is required' })} />
              {(errors.current_role || serverErrors.current_role) && (
                <span className="text-danger small">
                  {serverErrors.current_role ? serverErrors.current_role[0] : errors.current_role?.message}
                </span>
              )}
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
              {(errors.department || serverErrors.department) && (
                <span className="text-danger small">
                  {serverErrors.department ? serverErrors.department[0] : errors.department?.message}
                </span>
              )}
            </div>

            {/* Start Date */}
            <div className="mb-3">
              <label className="form-label">Start Date</label>
              <input type="date" className="form-control" {...register('start_date', { required: 'Start date is required' })} />
              {(errors.start_date || serverErrors.start_date) && (
                <span className="text-danger small">
                  {serverErrors.start_date ? serverErrors.start_date[0] : errors.start_date?.message}
                </span>
              )}
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

            {/* Submit */}
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-success px-4 py-2" disabled={submitting}>
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Submitting...
                  </>
                ) : id ? 'Update Employee' : 'Add Employee'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddEmployeeForm;
