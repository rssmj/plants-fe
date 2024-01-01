import { useForm } from 'react-hook-form';
import { axiosWithAuth } from '../utils/auth/axiosWithAuth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
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

  const navigate = useNavigate(); // Get the navigate function

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await axiosWithAuth(false).post('/auth/login', data);
      console.log('Login successful:', response.data);
      reset(); // Reset the form fields after successful login
      // Handle successful login (e.g., storing the token, redirecting the user)

      // Ensure 'data.username' is defined or provide a default value
      const username = data.username || 'default-username';

      // Redirect to the welcome page with the username as a parameter
      navigate(`/home/${username}`);
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (e.g., displaying an error message)
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
