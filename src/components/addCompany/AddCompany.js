import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = 'https://talentverifybackend.onrender.com';

const AddCompanyForm = () => {
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);      // for data fetching
  const [submitting, setSubmitting] = useState(false); // for form submission
  const [serverErrors, setServerErrors] = useState({}); // for handling server-side validation errors

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`${BASE_URL}/companies/${id}/`)
        .then(res => res.json())
        .then(data => {
          reset(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error loading company:', err);
          setLoading(false);
        });
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    const method = id ? 'PUT' : 'POST';
    const url = id
      ? `${BASE_URL}/companies/${id}/update/`
      : `${BASE_URL}/add-company/`;

    setSubmitting(true); // begin submit
    setServerErrors({}); // clear previous server errors

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerErrors(result); // Set server-side validation errors if present
        return;
      }

      console.log(`${id ? 'Updated' : 'Added'} company:`, result);

      if (!id) {
        reset(); // clear the form for new entry
      }

      navigate('/displaycompany');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    } finally {
      setSubmitting(false); // end submit
    }
  };

  return (
    <div className="container my-5">
      <h5 className="mb-3 border-bottom pb-2">{id ? 'Edit Company' : 'Add Company'}</h5>

      {/* Show loading spinner while data is being fetched */}
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="card p-4 mx-auto" style={{ maxWidth: "500px", backgroundColor: "#f9f9f1", borderRadius: "10px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Company Name */}
            <div className="mb-3">
              <label className="form-label">Company Name</label>
              <input className="form-control" {...register('company_name', { required: 'Company name is required' })} />
              {errors.company_name || serverErrors.company_name ? (
                <span className="text-danger small">
                  {serverErrors.company_name ? serverErrors.company_name[0] : errors.company_name?.message}
                </span>
              ) : null}
            </div>

            {/* Register Number */}
            <div className="mb-3">
              <label className="form-label">Register Number</label>
              <input className="form-control" {...register('register_number', { required: 'Register number is required' })} />
              {errors.register_number || serverErrors.register_number ? (
                <span className="text-danger small">
                  {serverErrors.register_number ? serverErrors.register_number[0] : errors.register_number?.message}
                </span>
              ) : null}
            </div>

            {/* Register Date */}
            <div className="mb-3">
              <label className="form-label">Register Date</label>
              <input type="date" className="form-control" {...register('register_date', { required: 'Register date is required' })} />
              {errors.register_date || serverErrors.register_date ? (
                <span className="text-danger small">
                  {serverErrors.register_date ? serverErrors.register_date[0] : errors.register_date?.message}
                </span>
              ) : null}
            </div>

            {/* Company Address */}
            <div className="mb-3">
              <label className="form-label">Company Address</label>
              <textarea className="form-control" {...register('company_address', { required: 'Address is required' })} />
              {errors.company_address || serverErrors.company_address ? (
                <span className="text-danger small">
                  {serverErrors.company_address ? serverErrors.company_address[0] : errors.company_address?.message}
                </span>
              ) : null}
            </div>

            {/* Contact Person */}
            <div className="mb-3">
              <label className="form-label">Contact Person</label>
              <input className="form-control" {...register('contact_person', { required: 'Contact person is required' })} />
              {errors.contact_person || serverErrors.contact_person ? (
                <span className="text-danger small">
                  {serverErrors.contact_person ? serverErrors.contact_person[0] : errors.contact_person?.message}
                </span>
              ) : null}
            </div>

            {/* Number of Employees */}
            <div className="mb-3">
              <label className="form-label">Number of Employees</label>
              <input
                type="number"
                className="form-control"
                {...register('number_of_employees', {
                  required: 'Employee count is required',
                  min: { value: 1, message: 'Must have at least 1 employee' }
                })}
              />
              {errors.number_of_employees || serverErrors.number_of_employees ? (
                <span className="text-danger small">
                  {serverErrors.number_of_employees ? serverErrors.number_of_employees[0] : errors.number_of_employees?.message}
                </span>
              ) : null}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" {...register('email', { required: 'Email is required' })} />
              {errors.email || serverErrors.email ? (
                <span className="text-danger small">
                  {serverErrors.email ? serverErrors.email[0] : errors.email?.message}
                </span>
              ) : null}
            </div>

            {/* Departments */}
            <div className="mb-3">
              <label className="form-label">Departments (comma separated)</label>
              <textarea className="form-control" {...register('departments', { required: 'Departments are required' })} />
              {errors.departments || serverErrors.departments ? (
                <span className="text-danger small">
                  {serverErrors.departments ? serverErrors.departments[0] : errors.departments?.message}
                </span>
              ) : null}
            </div>

            {/* Submit Button */}
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-success px-4 py-2" disabled={submitting}>
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Submitting...
                  </>
                ) : (
                  id ? 'Update Company' : 'Add Company'
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddCompanyForm;
