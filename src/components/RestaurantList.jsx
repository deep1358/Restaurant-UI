import React, { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';

const RestaurantList = ({ restaurants, onDelete, onEdit, setIsModalOpen }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(3); // Number of restaurants per page
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination calculation
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = filteredRestaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter restaurants based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
    setCurrentPage(1); // Reset to first page when search term changes
  }, [searchTerm, restaurants]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-4">
        {/* Pagination controls */}
        <nav className="flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastRestaurant >= filteredRestaurants.length}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Next
          </button>
        </nav>
      </div>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by restaurant name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
          style={{
            width: "30vw"
          }}
        />
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {currentRestaurants.map(restaurant => (
          <div key={restaurant.id} className="flex justify-center min-w-80">
            <RestaurantCard
              restaurant={restaurant}
              onDelete={onDelete}
              onEdit={onEdit}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
