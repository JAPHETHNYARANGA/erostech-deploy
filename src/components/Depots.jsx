import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; 
import '../styles/depots.scss';
import { Modal, Button } from "react-bootstrap";
import { BASE_URL } from './constants/constants';
import Navbar from './navigation/Navbar';
import axios from 'axios';

const Depots = () => {
  const [stations, setStations] = useState([]);
  const [selectedStationIndex, setSelectedStationIndex] = useState(0);
  const [productType, setProductType] = useState('Diesel');
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(null);
  const [allBalances, setAllBalances] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [loading, setLoading] = useState(false); // State to track loading state

  const token = Cookies.get('token');


  //fuel Balance logic
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (fuelTypeId) => {
    setBalanceDepoId(fuelTypeId); // Set the selected fuel type when the button is clicked
    setShow(true);
  };

  const [balance_depo_id, setBalanceDepoId] = useState('');
  const [balance_fuel_type, setBalanceFuelType] = useState('');
  const [balance_fuel_quantity, setBalanceQuantity] = useState('');


  const createBalance = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/createBalance`, {
        depo_id: balance_depo_id,
        fuel_type: balance_fuel_type,
        quantity: balance_fuel_quantity,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      

      // Assuming the response contains a token or user data
     
      if(response.data.success){
        fetchBalances();
        setBalanceFuelType('');
        setBalanceQuantity('');
        setBalanceDepoId('');
        handleClose();
      }else{
        setBalanceFuelType('');
        setBalanceQuantity('');
        setBalanceDepoId('');

        handleClose()
      }

    } catch (error) {
      setBalanceFuelType('');
        setBalanceQuantity('');
        setBalanceDepoId('');

        handleClose()
    }finally{
      setLoading(false);
    }
  };

  //fuel movement logic

  const [movement_depo_id, setMovementDepoId] = useState('');
  const [entryNumber, setEntryNumber] = useState('');
  const [vessel, setVessel] = useState('');
  const [movementQuantity, setMovementQuantity ] = useState('');
  const [entry, setEntry ] =useState('');
  const [entryDate, setEntryDate ] = useState('');
  const [movement_fuel_type , setMovementFuelType] = useState('');


  const [MovementShow, setMovementShow] = useState(false);
  const handleMovementClose = () => setMovementShow(false);

  const handleMovementShow = (fuelTypeId) => {
    setMovementDepoId(fuelTypeId); // Set the selected fuel type when the button is clicked
    setMovementShow(true);
  };


  const createFuelMovement = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/fuelMovements`, {
        entry_no: entryNumber,
        depo_id: movement_depo_id,
        fuel_type: movement_fuel_type,
        entry_date: entryDate,
        entry: entry,
        vessel: vessel,
        quantity: movementQuantity,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      

     
      if(response.data.success){
        setMovementDepoId('');
        setEntryNumber('');
        setVessel('');
        setMovementQuantity('');
        setEntry('');
        setEntryDate('');
        setMovementFuelType('');

        fetchBalances()
        handleMovementClose()
      }else{
        setMovementDepoId('');
        setEntryNumber('');
        setVessel('');
        setMovementQuantity('');
        setEntry('');
        setEntryDate('');
        setMovementFuelType('');

        
        handleMovementClose()
      }

    } catch (error) {
      setMovementDepoId('');
        setEntryNumber('');
        setVessel('');
        setMovementQuantity('');
        setEntry('');
        setEntryDate('');
        setMovementFuelType('');

      
      handleMovementClose()
  
    }finally{
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchDepots();
    fetchFuelTypes();
    fetchBalances();
    console.log("token is" + token)
   }, []);
   

   const fetchDepots = () => {
    fetch(`${BASE_URL}/fuelDepots`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setStations(data.station);
      })
      .catch((error) => {
        console.error('Error fetching stations:', error);
      });
  }
  
   
   const fetchFuelTypes = () =>{
    fetch(`${BASE_URL}/fuelTypes`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setFuelTypes(data.fuel);
      console.log("fuel types is " + data.fuel)
    })
    .catch((error) => console.error('Error fetching fuel types:', error));
   }

   const fetchBalances = () =>{
    fetch(`${BASE_URL}/fetchBalances`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setAllBalances(data.balance );
     console.log("Fuel balances:", data);
    })
    .catch((error) => {
      setError('Error fetching balances. Please try again.');
    });
   }

  const handleAdjustQuantity = (amount) => {
    const currentQuantity =
      stations[selectedStationIndex]?.products?.[productType] || 0;

   
    const newQuantity = Math.max(0, Math.floor(currentQuantity + amount));

    const data = {
      depo_id: stations[selectedStationIndex].id,
      fuel_type: productType,
      quantity: newQuantity,
    };

    fetch(`${BASE_URL}/createBalance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Create balance result:', result);
      })
      .catch((error) => {
        setError('Error creating balance. Please try again.');
      });

    setError(null);
  };


  

  const handleSetQuantity = () => {
    const currentQuantity = stations[selectedStationIndex]?.products?.[productType] || 0;
    // Your setting logic here
    setError(null);
  };

  return (
   <>
   <Navbar />
   <div className="p-4 mt-8 ml-64 body">
      <h2 className="text-2xl font-bold mb-4 title">Stations</h2>

      <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Location</th>
          <th scope="col">Super</th>
          <th scope="col">Diesel</th>
          <th scope="col">Kerosene</th>
          <th scope="col">Set Balance</th>
          <th scope="col">Fuel In/Out</th>
        </tr>
      </thead>
      <tbody>
      {stations.map((station, index) => {
      // Find the corresponding balance for this station
      const stationBalance = allBalances.find(
        (balance) => balance.depo_id === station.id
      );

      // Extract the quantities for each fuel type
      const petrolQuantity = stationBalance?.super || 0;
      const dieselQuantity = stationBalance?.diesel || 0;
      const keroseneQuantity = stationBalance?.kerosene || 0;

      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{station.name}</td>
          <td>{station.location}</td>
          <td>{petrolQuantity}</td>
          <td>{dieselQuantity}</td>
          <td>{keroseneQuantity}</td>
          <td>
            <i
              className="fa-solid fa-gas-pump"
              onClick={() => handleShow(station.id)}
            ></i>
          </td>
          <td>
            <i
              className="fa-solid fa-gear"
              onClick={() => handleMovementShow(station.id)}
            ></i>
          </td>
        </tr>
      );
    })}

    </tbody>

      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>CreateBalance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="flex items-center justify-center ">
          <div className="p-6 max-w-md w-full bg-white shadow-lg rounded-lg">
            
            <form onSubmit={createBalance}>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  className="w-full border rounded-lg py-2 px-3"
                  value={balance_fuel_quantity}
                  onChange={(e) => setBalanceQuantity(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-medium mb-1">
                  Fuel Type
                </label>
                <select
                    id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={balance_fuel_type}
                    onChange={(e) => setBalanceFuelType(e.target.value)}
                  >
                  <option selected>Select Fuel Type</option>
                  <option value="1">Super</option>
                  <option value="2">Diesel</option>
                  <option value="3">Kerosene</option>
                 
                </select>
              </div>
              {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Create Balance
              </button>
            )}
            </form>
          </div>
        </div>
          </Modal.Body>
      
      </Modal>


      <Modal show={MovementShow} onHide={handleMovementClose}>
        <Modal.Header closeButton>
          <Modal.Title>Movement Of Fuel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="flex items-center justify-center ">
          <div className="p-6 max-w-md w-full bg-white shadow-lg rounded-lg">
            
            <form onSubmit={createFuelMovement}>
            <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-1">
                  Entry Number
                </label>
                <input
                  type="text"
                  id="entryNumber"
                  className="w-full border rounded-lg py-2 px-3"
                  value={entryNumber}
                  onChange={(e) => setEntryNumber(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-1">
                  Vessel
                </label>
                <input
                  type="text"
                  id="vessel"
                  className="w-full border rounded-lg py-2 px-3"
                  value={vessel}
                  onChange={(e) => setVessel(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  className="w-full border rounded-lg py-2 px-3"
                  value={movementQuantity}
                  onChange={(e) => setMovementQuantity(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-medium mb-1">
                  Fuel Movement Direction
                </label>
                <select
                    id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                  >
                  <option selected>Select Fuel Movement</option>
                  <option value="1">Fuel To Depot</option>
                  <option value="0">Fuel From Depot</option>
                 
                </select>

              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block font-medium mb-1">
                  Fuel Type
                </label>
                <select
                    id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={movement_fuel_type}
                    onChange={(e) => setMovementFuelType(e.target.value)}
                  >
                 <option selected>Select Fuel Type</option>
                  <option value="1">Super</option>
                  <option value="2">Diesel</option>
                  <option value="3">Kerosene</option>
                 
                </select>

              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-1">
                  Entry Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full border rounded-lg py-2 px-3"
                  value={entryDate}
                  onChange={(e) => setEntryDate(e.target.value)}
                  required
                />
              </div>

              
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  Move
                </button>
              )}
            </form>
          </div>
        </div>
          </Modal.Body>
      
      </Modal>
    </div>
   </>
  );
};

export default Depots;
