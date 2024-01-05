import { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/auth/axiosWithAuth';
import '../styles/Home.css';

interface UserData {
  id: string;
  first_name: string;
}

const Home = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.error('No user ID found');
        // Optionally handle the absence of user ID
        return;
      }

      try {
        const response = await axiosWithAuth().get<UserData>(
          `/users/${userId}`
        );
        console.log('Fetched user data:', response.data); // Log for debugging
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Optionally handle fetching errors
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div className='home-container'>
      <h2 className='home-title'>Welcome to your Dashboard</h2>
      {userData ? (
        <div>
          <p>User Name: {userData.first_name}</p>
          {/* Render more user data as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Home;
