import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../company/Pagination';
import PaymentConfirmationModal from './PaymentConfirmationModal';
import { 
  setInvoiceData, 
  setRows, 
  setTotals,
  setCurrency, 
  setCustomerName,
  setCustomerEmail, 
  setCustomerPhone
} from '../../redux/paymentInvoiceSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../navigation/Navbar';

const PaymentReceived= () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

const dispatch = useDispatch()


useEffect(() => {
  axios
    .get('/proforma_invoices')
    .then((response) => {
      setInvoices(response.data);
      console.log(response.data); 
    })
    .catch((error) => console.error(error));
}, []);

  const openModal = (invoiceId) => {
    setSelectedInvoiceId(invoiceId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedInvoiceId(null);
    setIsModalOpen(false);
  };
  
  
  

  const handlePaymentConfirmation = (id) => {
    // You can send a request to the backend to mark the invoice as paid.
    // Here, we'll just update the local state for demonstration purposes.
    const updatedInvoices = invoices.map((invoice) => {
      if (invoice.id === id) {
        return { ...invoice, paid: true };
      }
      return invoice;
    });
    setInvoices(updatedInvoices);
  };

  // Filter invoices based on the search term
  const filteredInvoices = invoices.filter((invoice) =>
  invoice.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  invoice.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase())
);
const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInvoices.slice(
    indexOfFirstItem,
    indexOfLastItem
  );


const paginate = (pageNumber) => setCurrentPage(pageNumber);

const handleInvoiceClick = (invoice) => {
  dispatch(setInvoiceData({
    invoiceNumber: invoice.invoice_number,
    date: invoice.date,
    dueDate: invoice.due_date,
    subtotal: invoice.subtotal,
    tax: invoice.tax,
    total: invoice.total,
    currency: 'KSH', 
    customerName: invoice.customer_name, 
    customerPhone: invoice.customer_phone, 
    customerEmail: invoice.customer_email,

  

  }));

  const formattedRows = invoice.proforma_invoice_rows.map((row) => ({
    description: row.description,
    unitPrice: row.unit_price,
    quantity: row.quantity,
    total: row.total,
  }));

  dispatch(setRows(formattedRows)); 


  setSelectedInvoiceId(invoice.id);


};

  return (
    <>
    <Navbar />
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-14 ml-64">
      <div className="pb-4 bg-white dark:bg-gray-900">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
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
          <input
            type="text"
            id="table-search"
            className="block p-3 pl-12 text-lg text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for invoices"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <table className="w-full text-lg text-left text-gray-500 dark:text-gray-400">
        <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              {/* <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div> */}
            </th>
            <th scope="col" className="px-8 py-4">
              Invoice Number
            </th>
            <th scope="col" className="px-8 py-4">
              Customer Name
            </th>
            <th scope="col" className="px-8 py-4">
              Customer Email
            </th>
            <th scope="col" className="px-8 py-4">
              Due Date
            </th>
            <th scope="col" className="px-8 py-4">
              Subtotal
            </th>
            <th scope="col" className="px-8 py-4">
              Tax
            </th>
            <th scope="col" className="px-8 py-4">
              Total
            </th>
            <th scope="col" className="px-8 py-4">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((invoice) => (
           <tr
           key={invoice.id}
           className={`${
             invoice.isPaid ? 'bg-green-50 dark:bg-green-800' : 'bg-white dark:bg-gray-800'
           } ${
             selectedInvoiceId === invoice.id
               ? 'bg-blue-300 text-white' 
               : 'hover:bg-gray-100 dark:hover-bg-gray-600'
           }`}
           onClick={() => handleInvoiceClick(invoice)}
         >
              <td className="w-6 p-6">
                {/* <div className="flex items-center">
                  <input
                    id={`checkbox-table-${invoice.id}`}
                    type="checkbox"
                    className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor={`checkbox-table-${invoice.id}`} className="sr-only">
                    checkbox
                  </label>
                </div> */}
              </td>
              <th scope="row" className="px-8 py-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {invoice.invoice_number}
              </th>
              <td className="px-8 py-4 text-gray-900">{invoice.customer_name}</td>
              <td className="px-8 py-4 text-gray-900">{invoice.customer_email}</td>
              <td className="px-8 py-4 text-gray-900">{invoice.due_date}</td>
              <td className="px-8 py-4 text-gray-900">${invoice.subtotal}</td>
              <td className="px-8 py-4 text-gray-900">${invoice.tax}</td>
              <td className="px-8 py-4 text-gray-900">${invoice.total}</td>
              <td className="px-8 py-4 text-gray-900">
                {invoice.paid ? (
                  <span className="text-green-600 dark:text-green-400 text-lg">Paid</span>
                ) : (
                  <button
                  onClick={() => openModal(invoice.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg py-2 px-4 rounded"
                >
                  Confirm Payment
                </button>
                
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredInvoices.length} 
        paginate={paginate}
        currentPage={currentPage}
      />
      {isModalOpen && (
  <PaymentConfirmationModal
    isOpen={isModalOpen}
    onClose={closeModal}
    onConfirm={() => handlePaymentConfirmation(selectedInvoiceId)}
    invoiceId={selectedInvoiceId || 0}
  />
)}
 <Link to="/load-authority">
        <button className="bg-blue-500 text-white px-6 py-2 rounded mt-4">
          Next (Load Authority)
        </button>
      </Link>

    </div>
    </>
    
  );
};

export default PaymentReceived;
