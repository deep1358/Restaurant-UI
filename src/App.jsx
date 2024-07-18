import React, { useState, useEffect } from 'react';
import RestaurantList from './components/RestaurantList';
import AddRestaurantModal from './components/AddRestaurantModal';
import { getRestaurants, addRestaurant, deleteRestaurant, updateRestaurant } from './utils/api';

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restaurantToEdit, setRestaurantToEdit] = useState(null); // State to hold restaurant being edited

  // Fetch restaurants on component mount
  useEffect(() => {
    fetchRestaurants();
  }, []);

  /**
   * Function to fetch restaurants from the API.
   * @returns {Promise<void>} Promise that resolves once restaurants are fetched and state is updated.
   */
  const fetchRestaurants = async () => {
    try {
      const data = await getRestaurants();
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      throw new Error(error); // Rethrow error for handling elsewhere if needed
    }
  };

  /**
   * Function to handle adding a new restaurant.
   * @param {Object} newRestaurant The new restaurant object to add.
   * @returns {Promise<void>} Promise that resolves once the restaurant is added and state is updated.
   */
  const handleAddRestaurant = async (newRestaurant) => {
    try {
      await addRestaurant(newRestaurant);
      await fetchRestaurants(); // Refresh restaurant list after adding
    } catch (error) {
      console.error('Error adding restaurant:', error);
      throw new Error(error); // Rethrow error for handling elsewhere if needed
    }
  };

  /**
   * Function to handle editing an existing restaurant.
   * @param {Object} editedRestaurant The edited restaurant object.
   * @returns {Promise<void>} Promise that resolves once the restaurant is edited and state is updated.
   */
  const handleEditRestaurant = async (editedRestaurant) => {
    try {
      await updateRestaurant(editedRestaurant); // Assuming updateRestaurant API function exists
      await fetchRestaurants(); // Refresh restaurant list after editing
      setRestaurantToEdit(null); // Clear the restaurantToEdit state
    } catch (error) {
      console.error('Error editing restaurant:', error);
      throw new Error(error); // Rethrow error for handling elsewhere if needed
    }
  };

  /**
   * Function to handle deleting a restaurant.
   * @param {Object} restaurant The restaurant object to delete.
   * @returns {Promise<void>} Promise that resolves once the restaurant is deleted and state is updated.
   */
  const handleDeleteRestaurant = async (restaurant) => {
    if (window.confirm(`Are you sure you want to delete ${restaurant.name}?`)) {
      try {
        await deleteRestaurant(restaurant.id);
        const updatedRestaurants = restaurants.filter(r => r.id !== restaurant.id);
        setRestaurants(updatedRestaurants);
      } catch (error) {
        console.error('Error deleting restaurant:', error);
        throw new Error(error); // Rethrow error for handling elsewhere if needed
      }
    }
  };

  return (
    <>
      {/* Add Restaurant Modal */}
      <AddRestaurantModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setRestaurantToEdit(null); // Clear restaurantToEdit state when modal is closed
        }}
        onSave={restaurantToEdit ? handleEditRestaurant : handleAddRestaurant}
        restaurantToEdit={restaurantToEdit} // Pass restaurantToEdit prop to modal
      />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center my-4">Restaurant Admin</h1>
          <div className="flex justify-end mb-4">
            {/* Add Restaurant Button */}
            <button
              onClick={() => {
                setIsModalOpen(true);
                setRestaurantToEdit(null); // Reset restaurantToEdit for add mode
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Add Restaurant
            </button>
          </div>
          <div>
            {/* Restaurant List Component */}
            <RestaurantList
              restaurants={restaurants}
              onDelete={handleDeleteRestaurant}
              onEdit={setRestaurantToEdit} // Pass function to set restaurantToEdit
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
