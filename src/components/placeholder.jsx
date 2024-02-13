import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditEntriesModal from './EditEntriesModal';
import AddEntriesModal from './AddEntriesModal';
import Pagination from '../company/Pagination';

function Entries() {
  const [entries, setEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [warning, setWarning] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    axios.get('/entries')
      .then((response) => {
        setEntries(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setWarning('User not authorized');
      });
  }, []);

  const handleDelete = (companyId) => {
    axios.delete(`/api/v1/companies/${companyId}`)
      .then(() => {
        setEntries(entries.filter((entry) => entry.id !== companyId));
      })
      .catch((error) => {
        console.error('Error deleting entry:', error);
        setWarning('Error fetching data');
      });
  };

  const handleUpdateEntry = (updatedEntry) => {
    axios.put(`/api/v1/companies/${updatedEntry.id}`, updatedEntry)
      .then((response) => {
        console.log('Entry updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error updating entry:', error);
      });
  };

  const handleAddEntry = (newEntry) => {
    axios.post('/api/v1/companies', newEntry)
      .then((response) => {
        console.log('Entry added successfully:', response.data);
        setEntries([...entries, response.data]);
      })
      .catch((error) => {
        console.error('Error adding entry:', error);
        setWarning(`Error adding entry (Status: ${error.response?.status || 'N/A'}): ${error.message}`);
      });
  };

  const filteredEntries = entries.filter((entry) =>
    entry.name && entry.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (entry) => {
    setSelectedEntry(entry);
    setIsEditModalOpen(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEntries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg ml-64 mt-20">
      <div className="pb-4 bg-white dark:bg-gray-900 flex justify-between items-center">
        <label htmlFor="entry-search" className="sr-only">Search</label>
        <input
          type="text"
          id="entry-search"
          className="block p-2 pl-10 text-lg text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for entries by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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
          Add Entry
        </button>
      </div>
      <table className="w-full text-lg text-left text-gray-900 dark:text-gray-400 mt-4">
        <thead className="text-md text-gray-900 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              Entry Number
            </th>
            <th scope="col" className="p-4">
              Entry
            </th>
            {/* ... (rest of the header columns) */}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((entry) => (
            <tr key={entry.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">
                {entry.name}
              </td>
              {/* ... (rest of the columns) */}
              <td className="px-6 py-4 space-x-2">
                <button onClick={() => handleEdit(entry)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
                  <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    {/* ... (edit icon path) */}
                  </svg>
                </button>
                <button onClick={() => handleDelete(entry.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ">
                  <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    {/* ... (delete icon path) */}
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredEntries.length} 
        paginate={paginate}
        currentPage={currentPage}
      />
      <EditEntriesModal
        entry={selectedEntry}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateEntry}
      />
      <AddEntriesModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddEntry}
      />
    </div>
  );
}

export default Entries;
