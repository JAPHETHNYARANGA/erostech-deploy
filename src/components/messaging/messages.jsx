import React from 'react';

const Messages = ({ onEditItem, cellData }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
     <form >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Issued At:</label>
            <input
              type="date"
              // value={issued_at}
              // onChange={(e) => setIssuedAt(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Issued By:</label>
            <input
              type="text"
              // value={issued_by}
              // onChange={(e) => setIssuedBy(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Recipient Email:</label>
            <input
              type="text"
              // value={recipient_email}
              // onChange={(e) => setRecipientEmail(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Depot:</label>
            <input
              type="text"
              // value={selectedDepot}
              // onChange={(e) => setSelectedDepot(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Type:</label>
            <input
              type="text"
              // value={product_type}
              // onChange={(e) => setProduct_type(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Quantity Leaving:</label>
            <input
              type="number"
              // value={quantity_leaving}/
              // onChange={(e) => setQuantity_leaving(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Destination:</label>
            <input
              type="text"
              // value={destination}
              // onChange={(e) => setDestination(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Vehicle Details:</label>
            <input
              type="text"
              // value={vehicle_details}
              // onChange={(e) => setVehicle_details(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="buttons">
      
               
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    Generate Gate Pass
                  </button>
                

          </div>
         
        </form>
    </div>
  );
};

export default Messages;
