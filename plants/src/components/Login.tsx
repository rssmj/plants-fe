import { useForm } from 'react-hook-form';
import { axiosWithAuth } from '../utils/axiosWithAuth';

interface LoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    reset, // Include reset function from useForm
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await axiosWithAuth(false).post('/auth/login', data);
      console.log('Login successful:', response.data);
      reset(); // Reset the form fields after successful login
      // Handle successful login (e.g., storing the token, redirecting the user)
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (e.g., displaying an error message)
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username:</label>
          <input
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
