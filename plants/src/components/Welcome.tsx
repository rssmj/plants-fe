import { Link } from 'react-router-dom';
import '../styles/Welcome.css'; // Import the CSS file for Welcome styling

const Welcome = () => {
  return (
    <div className='welcome-container'>
      <h2 className='welcome-title'>WaterMyPlants</h2>
      <p className='welcome-message'>[L_L]</p>
      <ul className='welcome-links'>
        <li>
          <Link to='/login' className='welcome-link'>
            Login
          </Link>
        </li>
        <li>
          <Link to='/register' className='welcome-link'>
            Register
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Welcome;
