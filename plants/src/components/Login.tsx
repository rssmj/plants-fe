import { useForm } from 'react-hook-form';
import { axiosWithAuth } from '../utils/auth/axiosWithAuth';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

interface LoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await axiosWithAuth().post('/auth/login', data);
      // Extract authToken and username from the response
      // Adjust these according to your actual API response structure
      const { authToken, username } = response.data;

      // Store authToken and username in local storage
      localStorage.setItem('AUTH_TOKEN', authToken);
      localStorage.setItem('username', username);

      console.log('Login successful:', response.data);
      reset(); // Reset the form fields after successful login

      navigate('/home'); // Redirect to the home page
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
        <div>
          <label className='login-label'>Username:</label>
          <input
            {...register('username', { required: 'Username is required' })}
            className='login-input'
          />
          {errors.username && (
            <p className='login-error'>{errors.username.message}</p>
          )}
        </div>
        <div>
          <label className='login-label'>Password:</label>
          <input
            type='password'
            {...register('password', { required: 'Password is required' })}
            className='login-input'
          />
          {errors.password && (
            <p className='login-error'>{errors.password.message}</p>
          )}
        </div>
        <button type='submit' className='login-button'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
