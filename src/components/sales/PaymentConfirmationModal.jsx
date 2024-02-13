// PaymentConfirmationModal.jsx

import React from 'react';
import axios from 'axios';

const PaymentConfirmationModal = ({ isOpen, onClose, onConfirm, invoiceId }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/proforma_invoices/${invoiceId}/confirm_payment`);
      onConfirm();
      onClose();
    } catch (error) {
      console.error('Error updating backend:', error);
      // Handle errors, show a message, or perform other actions as needed
    }
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'} fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center`}>
      <div className="modal-content bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900">Confirm Payment</h2>
        <p className="text-gray-700 my-4">Are you sure you want to confirm this payment?</p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold text-lg py-2 px-4 rounded"
            >
              No
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg py-2 px-4 rounded ml-2"
            >
              Yes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentConfirmationModal;
