import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/constants';
import Alert from 'react-bootstrap/Alert';

const GatePassForm = () => {
  const [selectedDepot, setSelectedDepot] = useState('');
  const [product_type, setProduct_type] = useState('');
  const [quantity_leaving, setQuantity_leaving] = useState('');
  const [destination, setDestination] = useState('');
  const [vehicle_details, setVehicle_details] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [user_id, setUser_id] = useState('');
  const [issued_at, setIssuedAt] = useState('');
  const [issued_by, setIssuedBy] = useState('');
  const [warning, setWarning] = useState(null);
  const [recipient_email, setRecipientEmail] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading state

  const navigate = useNavigate();

  const [alertVariant, setAlertVariant] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);



  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/createGatePass`, {
        issueAt: issued_at,
        issueBy: issued_by,
        Depot: selectedDepot,
        productType: product_type,
        quantityLeaving: quantity_leaving,
        destination: destination,
        vehicleDetails: vehicle_details,
        recipient_email: recipient_email

       
      });

      if (response.data.success) {
        
        setAlertVariant('success');
        setAlertMessage('Gatepass Created!');
        setShowAlert(true);

        
      } else {

        setAlertVariant('danger');
        setAlertMessage('Gatepass Creation Failed!');
        setShowAlert(true);

      }
    } catch (error) {
      console.error('Login failed:', error.message);
      setAlertVariant('danger');
      setAlertMessage('Failed to create Gate pass!');
      setShowAlert(true);


    }finally{
      setSelectedDepot('');
        setIssuedAt('');
        setIssuedBy('');
        setSelectedDepot('');
        setProduct_type('');
        setQuantity_leaving('');
        setDestination('');
        setVehicle_details('');
        setRecipientEmail('');
      setLoading(false);
    }
  };




  const NavigateToGatePasses = () => {
    return navigate('/allgatepasses');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      {showAlert && (
          <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
            {alertMessage}
          </Alert>
        )}
      
        <h2 className="text-lg font-semibold mb-4 text-center">Gate Pass</h2>
        {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
        {warning && (
        <div className="bg-red-200 text-red-800 p-2 mb-4 rounded-lg">
          {warning}
        </div>
      )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Issued At:</label>
            <input
              type="date"
              value={issued_at}
              onChange={(e) => setIssuedAt(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Issued By:</label>
            <input
              type="text"
              value={issued_by}
              onChange={(e) => setIssuedBy(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Recipient Email:</label>
            <input
              type="text"
              value={recipient_email}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <input type="hidden" value={user_id} />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Depot:</label>
            <input
              type="text"
              value={selectedDepot}
              onChange={(e) => setSelectedDepot(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Type:</label>
            <input
              type="text"
              value={product_type}
              onChange={(e) => setProduct_type(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Quantity Leaving:</label>
            <input
              type="number"
              value={quantity_leaving}
              onChange={(e) => setQuantity_leaving(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Destination:</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Vehicle Details:</label>
            <input
              type="text"
              value={vehicle_details}
              onChange={(e) => setVehicle_details(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="buttons">
      
                {loading ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    Generate Gate Pass
                  </button>
                )}

            <button className='ml-3 btn btn-success' onClick={NavigateToGatePasses}>View All Gate Passes</button>

          </div>
         
        </form>
        
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default GatePassForm;
