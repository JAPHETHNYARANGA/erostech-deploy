import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import InfoDialog from '../Dialogs/infoDialog';
import ErrorDialog from '../Dialogs/errorDialog';

const GatePassForm = () => {
  const [selectedDepot, setSelectedDepot] = useState('');
  const [product_type, setProduct_type] = useState('');
  const [quantity_leaving, setQuantity_leaving] = useState('');
  const [destination, setDestination] = useState('');
  const [vehicle_details, setVehicle_details] = useState('');
  const [error, setError] = useState(null);
  const [issued_at, setIssuedAt] = useState('');
  const [issued_by, setIssuedBy] = useState('');
  const [recipient_email, setRecipientEmail] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading state

  const navigate = useNavigate();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [depots, setDepots] = useState([]);

  const token = Cookies.get('token');

  // Function to fetch depots from API
  useEffect(() => {
    fetchDepots();
  }, []);

  const fetchDepots = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/fuelDepots`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDepots(response.data.station); // Assuming response.data.station contains an array of depot objects
    } catch (error) {
      console.error('Error fetching depots:', error);
      // Handle error state
    }
  };

  const handleProductTypeChange = (e) => {
    setProduct_type(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/createGatePass`,
        {
          issueAt: issued_at,
          issueBy: issued_by,
          Depot: selectedDepot,
          productType: product_type,
          quantityLeaving: quantity_leaving,
          destination: destination,
          vehicleDetails: vehicle_details,
          recipient_email: recipient_email
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000); // Hide after 3 seconds
      } else {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 3000); // Hide after 3 seconds
      }
    } catch (error) {
      console.error('Error creating gate pass:', error);
      setShowError(true);
    } finally {
      setLoading(false);
      setSelectedDepot('');
      setIssuedAt('');
      setIssuedBy('');
      setProduct_type('');
      setQuantity_leaving('');
      setDestination('');
      setVehicle_details('');
      setRecipientEmail('');
    }
  };

  const NavigateToGatePasses = () => {
    navigate('/allgatepasses');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <InfoDialog  message={"success"} show={showSuccess} /> 
        <ErrorDialog message={"something went wrong, please check your connection and try again"} show={showError} /> 

        <h2 className="text-lg font-semibold mb-4 text-center">Gate Pass</h2>

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
            <label className="block text-sm font-medium text-gray-700">Recipient Email:</label>
            <input
              type="text"
              value={recipient_email}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Depot:</label>
            <select
              value={selectedDepot}
              onChange={(e) => setSelectedDepot(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Depot</option>
              {depots.map((depot) => (
                <option key={depot.id} value={depot.id}>
                  {depot.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Type:</label>
            <select
              value={product_type}
              onChange={handleProductTypeChange}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Product Type</option>
              <option value="super">Super</option>
              <option value="kerosene">Kerosene</option>
              <option value="diesel">Diesel</option>
            </select>
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
