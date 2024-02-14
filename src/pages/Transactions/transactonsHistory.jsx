import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../components/constants/constants';

const TransactonsHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [depotMap, setDepotMap] = useState({});

  useEffect(() => {
    fetchTransactions();
    fetchDepo();
  }, []);

  const fetchTransactions = () =>{
    fetch(`${BASE_URL}/fuelMovements`)
    .then((response) => response.json())
    .then((data) => {
      setTransactions(data.fuelMovement || []);
    })
    .catch((error) => console.error('Error fetching supplies:', error));
  }

  const fetchDepo = () =>{
    fetch(`${BASE_URL}/fuelDepots`)
    .then((response) => response.json())
    .then((data) => {
      const depotNameMap = {};
      data.station.forEach(depot => {
        depotNameMap[depot.id] = depot.name;
      });
      setDepotMap(depotNameMap);
    })
    .catch((error) => console.error('Error fetching supplies:', error));
  }

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg ml-64 mt-16">
      <div className="pb-4 bg-white dark:bg-gray-900 flex justify-between items-center">
        <div>
          <label htmlFor="invoice-search" className="sr-only">Search</label>
          <input
            type="text"
            id="invoice-search"
            className="block p-2 pl-10 text-lg text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for invoices by invoice number"
          />
        </div>
      </div>
      <table className="w-full text-lg text-left text-gray-900 dark:text-gray-400 mt-4">
        <thead className="text-md text-gray-900 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              Id
            </th>
            <th scope="col" className="p-4">
              Depot
            </th>
            <th scope="col" className="p-4">
              Fuel Moved
            </th>
            <th scope="col" className="p-4">
              Direction
            </th>
            <th scope="col" className="p-4">
              Date Moved
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td className="p-4">{transaction.id}</td>
              <td className="p-4">{depotMap[transaction.depo_id]}</td>
              <td className="p-4">{transaction.quantity}</td>
              <td className="p-4">{transaction.entry === '0' ? 'From Depo' : 'Into Depo'}</td> 
              <td className="p-4">{transaction.entry_date}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactonsHistory;
