import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom'; // Updated to use useNavigate

const AddCompanyForm = () => {
  const { id } = useParams(); // For edit
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate(); // Initialize useNavigate
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    if (id) {
      setLoading(true); // Start loading when data is being fetched
      fetch(`https://talentverifybackend.onrender.com/companies/${id}/`)
        .then(res => res.json())
        .then(data => {
          reset(data); // Populate the form with the fetched data
          setLoading(false); // Set loading to false when data is fetched
        })
        .catch(err => {
          console.error('Error loading company:', err);
          setLoading(false); // Set loading to false even if there is an error
        });
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    const method = id ? 'PUT' : 'POST';
    const url = id
      ? `https://talentverifybackend.onrender.com/companies/${id}/update/`
      : 'https://talentverifybackend.onrender.com/add-company/';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save company');
      }

      const result = await response.json();
      console.log(`${id ? 'Updated' : 'Added'} company:`, result);

      if (!id) {
        reset(); // Reset the form if adding a new company
      }

      // After successful form submission, navigate to the company list page
      navigate('/displaycompany'); 
    } catch (error) {
      console.error('Error submitting form:', error);
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
        <div className="card p-4 mx-auto" style={{ maxWidth: "400px", backgroundColor: "#f9f9f1", borderRadius: "10px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Company Name */}
            <div className="mb-3">
              <label className="form-label">Company Name</label>
              <input className="form-control" {...register('company_name', { required: 'Company name is required' })} />
              {errors.company_name && <span className="text-danger small">{errors.company_name.message}</span>}
            </div>

            {/* Register Number */}
            <div className="mb-3">
              <label className="form-label">Register Number</label>
              <input className="form-control" {...register('register_number', { required: 'Register number is required' })} />
              {errors.register_number && <span className="text-danger small">{errors.register_number.message}</span>}
            </div>

            {/* Register Date */}
            <div className="mb-3">
              <label className="form-label">Register Date</label>
              <input type="date" className="form-control" {...register('register_date', { required: 'Register date is required' })} />
              {errors.register_date && <span className="text-danger small">{errors.register_date.message}</span>}
            </div>

            {/* Company Address */}
            <div className="mb-3">
              <label className="form-label">Company Address</label>
              <textarea className="form-control" {...register('company_address', { required: 'Address is required' })} />
              {errors.company_address && <span className="text-danger small">{errors.company_address.message}</span>}
            </div>

            {/* Contact Person */}
            <div className="mb-3">
              <label className="form-label">Contact Person</label>
              <input className="form-control" {...register('contact_person', { required: 'Contact person is required' })} />
              {errors.contact_person && <span className="text-danger small">{errors.contact_person.message}</span>}
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
              {errors.number_of_employees && <span className="text-danger small">{errors.number_of_employees.message}</span>}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" {...register('email', { required: 'Email is required' })} />
              {errors.email && <span className="text-danger small">{errors.email.message}</span>}
            </div>

            {/* Departments */}
            <div className="mb-3">
              <label className="form-label">Departments (comma separated)</label>
              <textarea className="form-control" {...register('departments', { required: 'Departments are required' })} />
              {errors.departments && <span className="text-danger small">{errors.departments.message}</span>}
            </div>

            {/* Submit Button */}
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-success px-4 py-2">
                {id ? 'Update Company' : 'Add Company'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddCompanyForm;
