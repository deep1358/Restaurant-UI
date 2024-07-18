const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/restaurants`;

/**
 * Utility function to fetch JSON data from an API endpoint
 * @param {string} url - The URL of the API endpoint
 * @param {object} options - Optional fetch options (e.g., method, headers, body)
 * @returns {Promise<any>} A promise that resolves to the parsed JSON data
 */
const fetchJson = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // For DELETE requests, where server might not return anything
    if (response.status === 204) {
      return; // Return undefined if DELETE was successful and no content is returned
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

/**
 * Function to fetch all restaurants
 * @returns {Promise<Array>} A promise that resolves to an array of restaurants
 */
export const getRestaurants = async () => {
  try {
    return await fetchJson(baseUrl);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};

/**
 * Function to add a new restaurant
 * @param {object} restaurantData - The restaurant data to be added
 * @returns {Promise<any>} A promise that resolves to the response data after adding the restaurant
 */
export const addRestaurant = async (restaurantData) => {
  try {
    return await fetchJson(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restaurantData),
    });
  } catch (error) {
    console.error('Error adding restaurant:', error);
    throw error;
  }
};

/**
 * Function to update an existing restaurant
 * @param {object} restaurantData - The updated restaurant data
 * @returns {Promise<any>} A promise that resolves to the response data after updating the restaurant
 */
export const updateRestaurant = async (restaurantData) => {
  try {
    const url = `${baseUrl}/${restaurantData.id}`;
    return await fetchJson(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restaurantData),
    });
  } catch (error) {
    console.error('Error updating restaurant:', error);
    throw error;
  }
};

/**
 * Function to delete a restaurant
 * @param {number} restaurantId - The ID of the restaurant to delete
 * @returns {Promise<any>} A promise that resolves to the response data after deleting the restaurant
 */
export const deleteRestaurant = async (restaurantId) => {
  try {
    const url = `${baseUrl}/${restaurantId}`;
    return await fetchJson(url, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    throw error;
  }
};
