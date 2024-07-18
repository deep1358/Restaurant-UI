import React from 'react';

const RestaurantCard = ({ restaurant, onDelete, onEdit, setIsModalOpen }) => {

  // Function to handle edit button click
  const handleEditClick = () => {
    setIsModalOpen(true); // Open the edit modal
    onEdit(restaurant); // Pass the restaurant to the parent component to set as the restaurantToEdit
  };

  return (
    <div className="max-w-sm bg-white overflow-hidden shadow-lg rounded-lg">
      <img className="w-full h-56 object-cover object-center rounded-t-lg" src={restaurant.image} alt={restaurant.name} />
      <div className="p-5">
        <div className="mb-4">
          <div className="font-bold text-xl mb-2">{restaurant.name}</div>
          <p className="text-gray-700 text-base mb-2">{restaurant.description}</p>
          <p className="text-gray-600 mb-2">{restaurant.city}, {restaurant.area}</p>
          <p className="text-gray-600 mb-2">Rating: {restaurant.rating || 'N/A'}</p>
          <p className="text-gray-600 mb-2">Capacity: {restaurant.capacity || 'N/A'}</p>
          <p className="text-gray-600 mb-2">Cuisine: {restaurant.cuisine || 'N/A'}</p>
        </div>
        <div className="flex justify-end">
          <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
            Edit
          </button>
          <button onClick={() => onDelete(restaurant)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
