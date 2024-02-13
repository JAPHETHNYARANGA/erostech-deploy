import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navigation/Navbar';

const OrderConfirmationModal = ({ onClose, onConfirm }) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOrderConfirmed(true);
  };

  return (
    <>
    <Navbar />
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Confirm Order</h2>
        {!orderConfirmed ? (
          <p>Are you sure you want to confirm this order?</p>
        ) : (
          <p className="text-green-500">Order confirmed successfully!</p>
        )}
        <div className="flex justify-end mt-6"> 
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          {!orderConfirmed ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          ) : null}
        </div>
      </div>
    </div>
    </>
  );
};

export default OrderConfirmationModal;
