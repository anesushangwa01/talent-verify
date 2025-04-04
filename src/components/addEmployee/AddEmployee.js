import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

const AddEmployeeForm = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm();

  const [companies, setCompanies] = useState([]);

  // Fetch companies on component load
  useEffect(() => {
    fetch('http://127.0.0.1:8000/companies/')
      .then(res => res.json())
      .then(data => setCompanies(data))
      .catch(err => console.error('Error fetching companies:', err));
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/add-employee/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to add employee');
      }

      const result = await response.json();
      console.log('Employee added:', result);
      reset();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add Employee</h2>

      {/* Company selection */}
      <div>
        <label>Company</label>
        <select {...register('company', { required: 'Company is required' })}>
          <option value="">Select Company</option>
          {companies.map(company => (
            <option key={company.id} value={company.id}>
              {company.company_name}
            </option>
          ))}
        </select>
        {errors.company && <span>{errors.company.message}</span>}
      </div>

      {/* Employee Name */}
      <div>
        <label>Employee Name</label>
        <input {...register('employee_name', { required: 'Name is required' })} />
        {errors.employee_name && <span>{errors.employee_name.message}</span>}
      </div>

      {/* Employee ID */}
      <div>
        <label>Employee ID</label>
        <input
          {...register('employee_id', { 
            required: 'ID is required',
            pattern: {
              value: /^[A-Za-z0-9]+$/,
              message: 'Only letters and numbers allowed'
            }
          })}
        />
        {errors.employee_id && <span>{errors.employee_id.message}</span>}
      </div>

      {/* Current Role */}
      <div>
        <label>Current Role</label>
        <input {...register('current_role', { required: 'Role is required' })} />
        {errors.current_role && <span>{errors.current_role.message}</span>}
      </div>

      {/* Department */}
      <div>
        <label>Department</label>
        <select {...register('department', { required: 'Department is required' })}>
          <option value="">Select Department</option>
          <option value="HR">Human Resources</option>
          <option value="IT">Information Technology</option>
          <option value="Finance">Finance</option>
          <option value="Operations">Operations</option>
        </select>
        {errors.department && <span>{errors.department.message}</span>}
      </div>

      {/* Start Date */}
      <div>
        <label>Start Date</label>
        <input type="date" {...register('start_date', { required: 'Start date is required' })} />
        {errors.start_date && <span>{errors.start_date.message}</span>}
      </div>

      {/* Left Date */}
      <div>
        <label>Left Date</label>
        <input type="date" {...register('left_date')} />
      </div>

      {/* Duties */}
      <div>
        <label>Duties</label>
        <textarea rows="4" {...register('duties')} />
      </div>

      <button type="submit">SUBMIT</button>
    </form>
  );
};

export default AddEmployeeForm;
