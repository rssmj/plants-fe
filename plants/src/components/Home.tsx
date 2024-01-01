import { useLocation } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get('username');

  return (
    <div className='home-container'>
      <h2 className='home-title'>Hello, {username}!</h2>
      {/* Rest of the Home component */}
    </div>
  );
};

export default Home;
