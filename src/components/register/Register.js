import { useForm } from 'react-hook-form';

const RegisterForm = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch,
    reset
  } = useForm();

  const onSubmit = (data) => {
    console.log('Registration data:', data);
    // Add your registration API call here
    reset();
  };

  return (
    <div>
      <h2>Create Account</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              },
              validate: {
                hasNumber: value => /[0-9]/.test(value) || 'Must contain at least one number',
                hasSpecialChar: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Must contain at least one special character'
              }
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => 
                value === watch('password') || 'Passwords do not match'
            })}
          />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        </div>

        <button type="submit">Register</button>
      </form>

      <div>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default RegisterForm;