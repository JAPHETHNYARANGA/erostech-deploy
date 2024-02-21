import React from 'react';

const Messages = ({ onEditItem, cellData }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    
    <form >
            <div className="mb-4">
              <p className='center'>Generate LPO</p>
            <label htmlFor="email" className="block font-medium mb-1">Receiver Name</label>
            <input type="text" id="name" className="w-full border rounded-lg py-2 px-3" 
            // value={receiverName}
              // onChange={(e) => setReceiverName(e.target.value)}
              required  />
            </div>
            <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">Receiver Company</label>
            <input type="text" id="name" className="w-full border rounded-lg py-2 px-3"  
            // value={receiverCompany}
              // onChange={(e) => setReceiverCompany(e.target.value)}
              required/>
            </div>
            <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">Receiver Address</label>
            <input type="text" id="name" className="w-full border rounded-lg py-2 px-3"  
            // value={receiverAddress}
              // onChange={(e) => setReceiverAddress(e.target.value)}
              required/>
            </div>
            <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">Receiver Phone</label>
            <input type="text" id="name" className="w-full border rounded-lg py-2 px-3" 
            // value={receiverPhone}
              // onChange={(e) => setReceiverPhone(e.target.value)}
              required />
            </div>
            <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">Receiver Email</label>
            <input type="text" id="name" className="w-full border rounded-lg py-2 px-3" 
            // value={receiverEmail}
              // onChange={(e) => setReceiverEmail(e.target.value)}
              required />
            </div>
            <div className="mb-3">
            <label htmlFor="email" className="block font-medium mb-1">Invoice Due Date</label>
            <input type="date" id="name" className="w-full border rounded-lg py-2 px-3" 
            // value={dueDate}
              // onChange={(e) => setDueDate(e.target.value)}
              required />
            </div>

            <h2 className='mb-3'>Items</h2>

            
              <div className="row items" >
                <div className="mb-4 col">
                  <label htmlFor="email" className="block font-medium mb-1">Item Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border rounded-lg py-2 px-3"
                    // value={item.itemName}
                    // onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4 col">
                  <label htmlFor="password" className="block font-medium mb-1">Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    className="w-full border rounded-lg py-2 px-3"
                    // value={item.quantity}
                    // onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4 col">
                  <label htmlFor="number" className="block font-medium mb-1">Cost per Litre</label>
                  <input
                    type="number"
                    id="amount"
                    className="w-full border rounded-lg py-2 px-3"
                    // value={item.amount}
                    // onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                    required
                  />
                </div>
              </div>
              

                <button className='btn btn-primary mb-2' >
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>

                <button className='btn btn-primary mb-2 ml-2'>
                  <i className="fa-solid fa-minus"></i>
                </button>

            
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  >
                    Create
              </button>
                
        </form>
    </div>
  );
};

export default Messages;
