import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../constants/constants';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import InfoDialog from '../Dialogs/infoDialog';
import ErrorDialog from '../Dialogs/errorDialog';

function FinalInvoice() {
    const [stations, setStations] = useState([]);
    const [receiverName, setReceiverName] = useState('');
    const [receiverCompany, setReceiverCompany] = useState('');
    const [receiverAddress, setReceiverAddress] = useState('');
    const [receiverPhone, setReceiverPhone] = useState('');
    const [receiverEmail, setReceiverEmail] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [actual_quantity, setActualQuantity] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false); 
    const [items, setItems] = useState([{ itemName: '', quantity: '', unit_amount:'',amount: '' }]);
    const [selectedDepot, setSelectedDepot] = useState('');

    const token = Cookies.get('token');

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const navigate = useNavigate();

    const showSuccessDialog = () => {
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
        }, 3000);
    };

    useEffect(() => {
        fetchDepots();
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

    const showErrorDialog = () => {
        setShowError(true);
        setTimeout(() => {
            setShowError(false);
        }, 3000);
    };

    const handleAddItem = () => {
        setItems([...items, { itemName: '',actual_quantity:'', quantity: '', unit_amount:'', amount: '' }]);
    };

    const handleRemoveItem = () => {
        setItems(prevItems => prevItems.length >  1 ? prevItems.slice(0, -1) : []);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                `${BASE_URL}/generateInvoice`,
                {
                    receiverName: receiverName,
                    receiverCompany: receiverCompany,
                    receiverAddress: receiverAddress,
                    receiverPhone: receiverPhone,
                    recipient_email: receiverEmail,
                    dueDate: dueDate,
                    depotId: selectedDepot,
                    items: items
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );  
            if(response.data.success){
                showSuccessDialog();
                navigate('/invoices');  
            } else {
                showErrorDialog();
                
            }
        } catch (error) {
            console.error('invoice creation failed:', error);
            showErrorDialog();
        } finally {
            setLoading(false);
        }
    };

    const handleItemChange = (index, property, value) => {
        const newItems = [...items];
        newItems[index][property] = value;
        setItems(newItems);
    };
  return (
    <div className="p-4 mt-8 ml-64 body">
        <h3>Invoice</h3>
        <InfoDialog  message={"success"} show={showSuccess} /> 
        <ErrorDialog message={"something went wrong, please check your connection and try again"} show={showError} /> 
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">Receiver Name</label>
            <input type="text" id="name" className="w-full border rounded-lg py-2 px-3" value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              required  />
            </div>
            <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">Receiver Company</label>
            <input type="text" id="name" className="w-full border rounded-lg py-2 px-3"  value={receiverCompany}
              onChange={(e) => setReceiverCompany(e.target.value)}
              required/>
            </div>
            <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">Receiver Address</label>
            <input type="text" id="name" className="w-full border rounded-lg py-2 px-3"  value={receiverAddress}
              onChange={(e) => setReceiverAddress(e.target.value)}
              required/>
            </div>
            <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">Receiver Phone</label>
            <input type="text" id="name" className="w-full border rounded-lg py-2 px-3" value={receiverPhone}
              onChange={(e) => setReceiverPhone(e.target.value)}
              required />
            </div>
            <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">Receiver Email</label>
            <input type="text" id="name" className="w-full border rounded-lg py-2 px-3" value={receiverEmail}
              onChange={(e) => setReceiverEmail(e.target.value)}
              required />
            </div>
            <div className="mb-3">
            <label htmlFor="email" className="block font-medium mb-1">Invoice Due Date</label>
            <input type="date" id="name" className="w-full border rounded-lg py-2 px-3" value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required />
            </div>

            <div className="mb-4">
            <label for="cars" className="block font-medium mb-1">Currency</label>
            <select className="w-full border rounded-lg py-2 px-3" name="cars" id="cars">
              <option value="volvo">USD</option>
              <option value="saab">KSH</option>
              <option value="opel">POUNDS</option>
              <option value="audi">YEN</option>
            </select>
            </div>

            <div className="mb-4">
            <label for="cars" className="block font-medium mb-1">Depot Name</label>
            <select
                className="w-full border rounded-lg py-2 px-3"
                name="cars"
                id="cars"
                value={selectedDepot}
                onChange={(e) => setSelectedDepot(e.target.value)}
                required
            >
                <option value="">Select Depot</option>
                {stations.slice(0, -3).map((station, index) => (
                    <option key={index} value={station.id}>{station.name}</option>
                ))}
            </select>

            </div>
            <h2 className='mb-3'>Items</h2>

            {items.map((item, index) => (
              <div className="row items" key={index}>
                <div className="mb-4 col">
                  <label htmlFor="email" className="block font-medium mb-1">Item Name</label>
                  <select
                      id="itemName"
                      className="w-full border rounded-lg py-2 px-3"
                      value={item.itemName}
                      onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                      required>
                      <option value="">Select Item Name</option>
                      <option value="super">Super</option>
                      <option value="diesel">Diesel</option>
                      <option value="kerosene">Kerosene</option>
                    </select>

                </div>
                <div className="mb-4 col">
                  <label htmlFor="password" className="block font-medium mb-1">Perceived Quantity On Invoice</label>
                  <input
                    type="number"
                    id="quantity"
                    className="w-full border rounded-lg py-2 px-3"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4 col">
                  <label htmlFor="password" className="block font-medium mb-1">Actual Quantity deducted</label>
                  <input
                    type="number"
                    id="quantity"
                    className="w-full border rounded-lg py-2 px-3"
                    value={item.actual_quantity}
                    onChange={(e) => handleItemChange(index, 'actual_quantity', e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4 col">
                  <label htmlFor="number" className="block font-medium mb-1">Cost per unit</label>
                  <input
                    type="number"
                    id="amount"
                    className="w-full border rounded-lg py-2 px-3"
                    value={item.unit_amount}
                    onChange={(e) => handleItemChange(index, 'unit_amount', e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4 col">
                  <label htmlFor="number" className="block font-medium mb-1">Total Cost</label>
                  <input
                    type="number"
                    id="amount"
                    className="w-full border rounded-lg py-2 px-3"
                    value={item.amount}
                    onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                    required
                  />
                </div>
              </div>
              ))}

                <button className='btn btn-primary mb-2' onClick={handleAddItem}>
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>

                <button className='btn btn-primary mb-2 ml-2' onClick={handleRemoveItem}>
                  <i className="fa-solid fa-minus"></i>
                </button>

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
                    Create
              </button>
                )}
        </form>
    </div>
  );
}

export default FinalInvoice;
