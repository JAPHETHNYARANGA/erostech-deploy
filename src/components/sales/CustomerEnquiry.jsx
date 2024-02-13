import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCustomerData } from '../../redux/customerSlice';
import Navbar from '../navigation/Navbar';

const CustomerEnquiry = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10); // Number of customers to display per page
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch customers from the server (replace with your actual API endpoint)
    const fetchAllCustomers = async () => {
      try {
        // Fetching customers, replace with your actual API call
        const response = await fetch('/customers');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching all customers:', error);
      }
    };

    fetchAllCustomers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers
    .filter((customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstCustomer, indexOfLastCustomer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    dispatch(setCustomerData(customer));
  };

  return (
    <>
    <Navbar />

    <div className="container mx-auto mt-28 ml-64">
      <h2 className="text-3xl mb-4">Customer Enquiry</h2>
      <div className="relative mt-1 mb-4">
        <input
          type="text"
          id="table-search"
          className="block p-2 pl-10 text-lg text-gray-900 border border-gray-300 rounded-lg w-1/3 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-6 h-6 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-lg text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer, index) => (
              <tr
                key={index}
                onClick={() => handleCustomerClick(customer)}
                style={{
                  cursor: 'pointer',
                  backgroundColor:
                    selectedCustomer && selectedCustomer.id === customer.id
                      ? '#E5E7EB'
                      : 'transparent',
                }}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {customer.name}
                </td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.phone}</td>
                <td className="px-6 py-4">{customer.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentCustomers.length < customersPerPage}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded"
        >
          Next
        </button>
      </div>
      <Link to="/proforma-invoice">
        <button className="bg-blue-500 text-white px-6 py-2 rounded mt-4">
          Next (Proforma Invoice)
        </button>
      </Link>
    </div>
    </>
    
  );
};

export default CustomerEnquiry;
