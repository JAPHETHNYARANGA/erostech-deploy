import React, { useState } from 'react';

function EditCustomerModal({ isOpen, onClose, customer, onUpdate }) {
  const [editedCustomer, setEditedCustomer] = useState({ ...customer });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer({
      ...editedCustomer,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    onUpdate(editedCustomer);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none ${
        isOpen ? 'visible' : 'invisible'
      }`}
    >
      <div className="relative w-auto max-w-md mx-auto my-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg relative flex flex-col w-full p-8">
          <div className="font-semibold text-xl mb-4">Edit Customer</div>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedCustomer.name}
                onChange={handleInputChange}
                placeholder={customer?.name || ''}
                className="mt-1 p-2 border rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={editedCustomer.email}
                onChange={handleInputChange}
                placeholder={customer?.email || ''}
                className="mt-1 p-2 border rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={editedCustomer.phone}
                onChange={handleInputChange}
                placeholder={customer?.phone || ''}
                className="mt-1 p-2 border rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700 dark:text-gray-300">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={editedCustomer.category}
                onChange={handleInputChange}
                placeholder={customer?.category || ''}
                className="mt-1 p-2 border rounded-lg w-full"
              />
            </div>
          </form>
          <div className="mt-6">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Update
            </button>
            <button
              onClick={onClose}
              className="ml-4 text-gray-500 hover:text-gray-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCustomerModal;
