import { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/auth/axiosWithAuth';
import '../styles/Home.css';

interface UserData {
  id: string;
  first_name: string;
  // Add other user properties here as needed
}

interface PlantData {
  id: string;
  name: string;
  // Add other plant properties here as needed
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
        const userResponse = await axiosWithAuth().get<UserData>(
          `/users/${userId}`
        );
        setUserData(userResponse.data);
        fetchUserPlants();
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchUserPlants = async () => {
      try {
        const plantsResponse = await axiosWithAuth().get<PlantData[]>(
          `/plants/user/${userId}`
        );
        setPlants(plantsResponse.data);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const addPlant = async () => {
    if (!newPlantName) return;
    try {
      const plantToAdd = { name: newPlantName, userId };
      const response = await axiosWithAuth().post(
        `/plants/${userId}`,
        plantToAdd
      );
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
    if (!editingPlant || !editingName) return;
    try {
      await axiosWithAuth().put(`/plants/${editingPlant.id}`, {
        name: editingName,
      });
      setPlants(
        plants.map((plant) =>
          plant.id === editingPlant.id ? { ...plant, name: editingName } : plant
        )
      );
      cancelEdit();
    } catch (error) {
      console.error('Error updating plant:', error);
    }
  };

  return (
    <div className='home-container'>
      <h2 className='home-title'>
        Welcome to your Dashboard, {userData?.first_name}
      </h2>

      <div className='plants-section'>
        <h3>Your Plants</h3>
        {plants.length > 0 ? (
          plants.map((plant) => (
            <div key={plant.id} className='plant-item'>
              {editingPlant?.id === plant.id ? (
                <div>
                  <input
                    type='text'
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </div>
              ) : (
                <div>
                  <p>{plant.name}</p>
                  <button onClick={() => startEdit(plant)}>Edit</button>
                  <button onClick={() => deletePlant(plant.id)}>Delete</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Loading plants...</p>
        )}
      </div>

      <div className='add-plant-section'>
        <h3>Add a New Plant</h3>
        <input
          type='text'
          value={newPlantName}
          onChange={(e) => setNewPlantName(e.target.value)}
          placeholder='Enter plant name'
        />
        <button onClick={addPlant}>Add Plant</button>
      </div>
    </div>
  );
};

export default Home;
