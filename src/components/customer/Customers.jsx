import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditCustomerModal from './EditCustomerModal';
import AddCustomerModal from './AddCustomerModal';
import Pagination from '../company/Pagination';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [warning, setWarning] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    axios.get('/customers')
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
        setWarning('Error fetching customers');
      });
  }, []);

  const handleDelete = (customerId) => {
    axios.delete(`/customers/${customerId}`)
      .then(() => {
        setCustomers(customers.filter((customer) => customer.id !== customerId));
      })
      .catch((error) => {
        console.error('Error deleting customer:', error);
        setWarning('Error deleting customer');
      });
  };

  const handleUpdateCustomer = (updatedCustomer) => {
    axios.put(`/customers/${updatedCustomer.id}`, updatedCustomer)
      .then((response) => {
        console.log('Customer updated successfully:', response.data);

      })
      .catch((error) => {
        console.error('Error updating customer:', error);
     
      });
  };
  

  const handleAddCustomer = (newCustomer) => {
    axios.post('/customers', newCustomer)
      .then((response) => {
        console.log('Customer added successfully:', response.data);
        setCustomers([...customers, response.data]);
      })
      .catch((error) => {
        console.error('Error adding customer:', error);
        setWarning(`Error adding customer (Status: ${error.response?.status || 'N/A'}): ${error.message}`);
      });
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name && customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg ml-64 mt-16">
      <div className="pb-4 bg-white dark:bg-gray-900 flex justify-between items-center">
        <div>
          <label htmlFor="customer-search" className="sr-only">Search</label>
          <input
            type="text"
            id="customer-search"
            className="block p-2 pl-10 text-lg text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for customers by customer number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {warning && (
          <div className="bg-red-200 text-red-800 p-2 mb-4 rounded-lg">
            {warning}
          </div>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center mr-10"
          onClick={() => setIsAddModalOpen(true)}
        >
          <svg
            className="w-5 h-5 mr-2 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
              d="M9 1v16M1 9h16"
            />
          </svg>
          Add customer
        </button>
      </div>

      <table className="w-full text-lg text-left text-gray-900 dark:text-gray-400 mt-4">
        <thead className="text-md text-gray-900 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              Name
            </th>
            <th scope="col" className="p-4">
              Email
            </th>
            <th scope="col" className="p-4">
              Phone
            </th>
            <th scope="col" className="p-4">
              Category
            </th>
           
          </tr>
        </thead>
        <tbody>
          {currentItems.map((customer) => (
            <tr
              key={customer.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{customer.name}</td>
              <td className="px-6 py-4">{customer.email}</td>
              <td className="px-6 py-4">{customer.phone}</td>
              <td className="px-6 py-4">{customer.category}</td>
            
              <td className="px-6 py-4">
               <button onClick={() => handleEdit(customer)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
  <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
    <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
    <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
  </svg>
</button>
<button onClick={() => handleDelete(customer.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ">
  <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
  </svg>
</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredCustomers.length}
        paginate={paginate}
        currentPage={currentPage}
      />

     
      <EditCustomerModal
        customer={selectedCustomer}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateCustomer}
      />

      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddCustomer}
      />
    </div>
  );
}

export default Customers;
