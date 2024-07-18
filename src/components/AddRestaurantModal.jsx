import React, { useState, useEffect } from 'react';

const AddRestaurantModal = ({ isOpen, onClose, onSave, restaurantToEdit }) => {
    // State to manage form data
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        area: '',
        city: '',
        capacity: 0,
        rating: 0,
        cuisine: '',
        image: '',
        id: 0
    });

    // Effect to populate form data when editing a restaurant
    useEffect(() => {
        if (restaurantToEdit) {
            // Populate form data with restaurantToEdit values when provided
            setFormData({
                name: restaurantToEdit.name,
                description: restaurantToEdit.description,
                city: restaurantToEdit.city,
                area: restaurantToEdit.area,
                rating: restaurantToEdit.rating,
                cuisine: restaurantToEdit.cuisine,
                image: restaurantToEdit.image,
                capacity: restaurantToEdit.capacity,
                id: restaurantToEdit.id
            });
        } else {
            // Reset form data when no restaurantToEdit is provided (for adding a new restaurant)
            setFormData({
                name: '',
                description: '',
                city: '',
                area: '',
                rating: 0,
                cuisine: 'Indian',
                image: '',
                capacity: 0,
                id: 0
            });
        }
    }, [isOpen, restaurantToEdit]);

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSubmit = { ...formData };

        // Remove empty or undefined fields from dataToSubmit
        Object.keys(dataToSubmit).forEach(key => {
            if (dataToSubmit[key] === '' || dataToSubmit[key] === undefined) {
                delete dataToSubmit[key];
            }
        });

        onSave(dataToSubmit); // Call onSave prop with the updated form data
        onClose(); // Close the modal
    };

    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="w-full">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">{restaurantToEdit ? 'Edit Restaurant' : 'Add Restaurant'}</h3>

                                    {/* Form fields */}
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-non focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area</label>
                                        <input type="text" id="area" name="area" value={formData.area} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                        <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacity</label>
                                        <input type="number" id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
                                        <input type="number" id="rating" name="rating" step="0.1" min="0" max="5" value={formData.rating} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">Cuisine</label>
                                        <input type="text" id="cuisine" name="cuisine" value={formData.cuisine} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                                        <input type="url" id="image" name="image" value={formData.image} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>

                                    {/* Action buttons */}
                                    <div className="pt-5">
                                        <div className="flex justify-end">
                                            <button type="button" onClick={onClose} className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                Cancel
                                            </button>
                                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                {restaurantToEdit ? 'Edit' : 'Add'} {/* Conditional button text based on editing or adding */}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRestaurantModal;
