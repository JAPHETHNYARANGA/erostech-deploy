import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../constants/constants';
import { useNavigate } from 'react-router-dom';


function FinalInvoice() {
    const [receiverName, setReceiverName] = useState('');
    const [receiverCompany, setReceiverCompany] = useState('');
    const [receiverAddress, setReceiverAddress] = useState('');
    const [receiverPhone, setReceiverPhone] = useState('');
    const [receiverEmail, setReceiverEmail] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false); 
    const [items, setItems] = useState([{ itemName: '', quantity: '', amount: '' }]);

    const handleAddItem = () => {
      setItems([...items, { itemName: '', quantity: '', amount: '' }]);
    };

    const handleRemoveItem = () => {
      setItems(prevItems => prevItems.length >  1 ? prevItems.slice(0, -1) : []);
    };

    

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      try {
        console.log(items)
          // Include the items array in the request payload
          const response = await axios.post(`${BASE_URL}/generateInvoice`, {
              receiverName: receiverName,
              receiverCompany: receiverCompany,
              receiverAddress: receiverAddress,
              receiverPhone: receiverPhone,
              recipient_email: receiverEmail,
              dueDate: dueDate,
              items: items // Pass the entire items array
          });
  
          // Handle the response from the server
          if(response.data.success){
              navigate('/invoices');  
          } else {
              // Handle error message or status
              setAlertVariant('danger');
              setAlertMessage('Failed to create invoice!');
          }
      } catch (error) {
          console.error('invoice creation failed:', error.message);
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

            <h2 className='mb-3'>Items</h2>

            {items.map((item, index) => (
              <div className="row items" key={index}>
                <div className="mb-4 col">
                  <label htmlFor="email" className="block font-medium mb-1">Item Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border rounded-lg py-2 px-3"
                    value={item.itemName}
                    onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4 col">
                  <label htmlFor="password" className="block font-medium mb-1">Quantity</label>
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
                  <label htmlFor="number" className="block font-medium mb-1">Cost per Litre</label>
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
