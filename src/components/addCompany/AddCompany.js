import { useForm } from 'react-hook-form';

const AddCompanyForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/add-company/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const result = await response.json();
      console.log('Company Added:', result);
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add Company</h2>
      <div>
        <label>Company Name</label>
        <input {...register('company_name', { required: 'Company name is required' })} />
        {errors.company_name && <span>{errors.company_name.message}</span>}
      </div>

      <div>
        <label>Register Number</label>
        <input {...register('register_number', { required: 'Register number is required' })} />
        {errors.register_number && <span>{errors.register_number.message}</span>}
      </div>

      <div>
        <label>Register Date</label>
        <input type="date" {...register('register_date', { required: 'Register date is required' })} />
        {errors.register_date && <span>{errors.register_date.message}</span>}
      </div>

      <div>
        <label>Company Address</label>
        <textarea {...register('company_address', { required: 'Address is required' })} />
        {errors.company_address && <span>{errors.company_address.message}</span>}
      </div>

      <div>
        <label>Contact Person</label>
        <input {...register('contact_person', { required: 'Contact person is required' })} />
        {errors.contact_person && <span>{errors.contact_person.message}</span>}
      </div>

      <div>
        <label>Number of Employees</label>
        <input
          type="number"
          {...register('number_of_employees', {
            required: 'Employee count is required',
            min: { value: 1, message: 'Must have at least 1 employee' }
          })}
        />
        {errors.number_of_employees && <span>{errors.number_of_employees.message}</span>}
      </div>

      <div>
        <label>Email</label>
        <input type="email" {...register('email', { required: 'Email is required' })} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label>Departments (comma separated)</label>
        <textarea {...register('departments', { required: 'Departments are required' })} />
        {errors.departments && <span>{errors.departments.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddCompanyForm;
