import { useForm } from 'react-hook-form';
import { axiosWithAuth } from '../utils/auth/axiosWithAuth';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

interface FormData {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  phone: string;
}

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axiosWithAuth().post('/auth/register', data);
      console.log('Registration successful:', response.data);
      reset(); // Reset the form fields after successful registration
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Registration failed:', error);
      // Additional error handling
    }
  };

  return (
    <div className='register-container'>
      <h2 className='register-title'>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='register-form'>
        <div>
          <label>First Name:</label>
          <input {...register('first_name')} />
          {errors.first_name && (
            <p className='error'>{errors.first_name.message}</p>
          )}
        </div>
        <div>
          <label>Last Name:</label>
          <input {...register('last_name')} />
          {errors.last_name && (
            <p className='error'>{errors.last_name.message}</p>
          )}
        </div>
        <div>
          <label>Username:</label>
          <input
            {...register('username', {
              required: 'Username is required',
              maxLength: 128,
            })}
          />
          {errors.username && (
            <p className='error'>{errors.username.message}</p>
          )}
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            {...register('password', {
              required: 'Password is required',
              maxLength: 128,
            })}
          />
          {errors.password && (
            <p className='error'>{errors.password.message}</p>
          )}
        </div>
        <div>
          <label>Phone:</label>
          <input
            {...register('phone', {
              required: 'Phone is required',
              maxLength: 15,
            })}
          />
          {errors.phone && <p className='error'>{errors.phone.message}</p>}
        </div>
        <button type='submit' className='register-button'>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
