import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../constants/constants';

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [warning, setWarning] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = () => {
    axios.get(`${BASE_URL}/fetchInvoices`)
      .then(response => {
        setInvoices(response.data.invoice || []);
      })
      .catch(error => console.error('Error fetching invoices:', error));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          onClick={handleShow}>
          <svg
            className="w-5 h-5 mr-2 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
              d="M9 1v16M1 9h16"/>
          </svg>
          Add Invoice
        </button>
      </div>
      <table className="w-full text-lg text-left text-gray-900 dark:text-gray-400 mt-4">
        <thead className="text-md text-gray-900 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              Invoice Number
            </th>
            <th scope="col" className="p-4">
              Company
            </th>
         
            <th scope="col" className="p-4">
              Billing Date
            </th>
            <th scope="col" className="p-4">
              Due Date
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice.id}>
              <td className="p-4">{invoice.invoiceNumber}</td>
              <td className="p-4">{invoice.ReceiverCompany}</td>
              <td className="p-4">{invoice.invoiceDate}</td>
              <td className="p-4">{invoice.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Supply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex items-center justify-center">
            <div className="row">
              <div className="col">
                <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center mr-10"
                  onClick={() => { }}
                >
                  <Link to="/final-invoice">Generate Invoice</Link>
                </button>
              </div>
              <div className="col">
                <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center mr-10"
                >
                  <Link to="/profoma-invoice">Generate Proforma Invoice</Link>
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default Invoices;
