import { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/auth/axiosWithAuth';
import '../styles/Home.css';

interface UserData {
  id: '';
  first_name: '';
}

interface PlantData {
  id: '';
  name: '';
  species: '';
}

const Home = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [plants, setPlants] = useState<PlantData[]>([]);
  const [newPlantName, setNewPlantName] = useState('');
  const [editingPlant, setEditingPlant] = useState<PlantData | null>(null);
  const [editingName, setEditingName] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.error('No user ID found');
        return;
      }

      try {
        const response = await axiosWithAuth().get<UserData>(
          `/users/${userId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axiosWithAuth().get<PlantData[]>(
          `/plants/user/${userId}`
        );
        setPlants(response.data);
      } catch (error) {
        console.error('Error fetching plants:', error);
        // Set an error message or handle the error as needed
      }
    };

    fetchPlants();
  }, [userId]);

  const addPlant = async () => {
    try {
      const response = await axiosWithAuth().post(`/plants/${userId}`, {
        name: newPlantName,
      });
      setPlants([...plants, response.data.plant]);
      setNewPlantName('');
    } catch (error) {
      console.error('Error adding plant:', error);
    }
  };

  const deletePlant = async (plantId: string) => {
    try {
      await axiosWithAuth().delete(`/plants/${plantId}`);
      setPlants(plants.filter((plant) => plant.id !== plantId));
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  const startEdit = (plant: PlantData) => {
    setEditingPlant(plant);
    setEditingName(plant.name);
  };

  const cancelEdit = () => {
    setEditingPlant(null);
    setEditingName('');
  };

  const saveEdit = async () => {
    if (editingPlant) {
      try {
        const response = await axiosWithAuth().put(
          `/plants/${editingPlant.id}`,
          {
            name: editingName,
          }
        );
        const updatedPlant = response.data;
        setPlants(
          plants.map((plant) =>
            plant.id === updatedPlant.id ? updatedPlant : plant
          )
        );
        setEditingPlant(null);
        setEditingName('');
      } catch (error) {
        console.error('Error saving edit:', error);
      }
    }
  };

  return (
    <div className='home-container'>
      <h2 className='home-title'>
        Welcome to your Dashboard, {userData?.first_name}
      </h2>

      <div className='section-container'>
        <h3 className='section-header'>Your Plants</h3>

        <ul className='plant-list'>
          {plants.length > 0 ? (
            plants.map((plant) => (
              <li key={plant.id} className='plant-list-item'>
                {editingPlant?.id === plant.id ? (
                  <div>
                    <input
                      type='text'
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                    />
                    <button className='edit-button' onClick={saveEdit}>
                      Save
                    </button>
                    <button className='edit-button' onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className='plant-name'>{plant.name}</p>
                    {/* Add plant details as needed */}
                    <div className='plant-details'>
                      {/* Plant details go here */}
                    </div>
                    <div>
                      <button
                        className='edit-button'
                        onClick={() => startEdit(plant)}
                      >
                        Edit
                      </button>
                      <button
                        className='delete-button'
                        onClick={() => deletePlant(plant.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))
          ) : (
            <p>No plants added.</p>
          )}
        </ul>
      </div>

      <div className='section-container'>
        <h3 className='section-header'>Add a New Plant</h3>
        <div>
          <input
            type='text'
            placeholder='Plant name'
            value={newPlantName}
            onChange={(e) => setNewPlantName(e.target.value)}
            className='add-plant-input'
          />
          <button className='edit-button' onClick={addPlant}>
            Add Plant
          </button>
        </div>
      </div>

      <div className='footer'>
        <p>2024 WaterMyPlants</p>
      </div>
    </div>
  );
};

export default Home;
