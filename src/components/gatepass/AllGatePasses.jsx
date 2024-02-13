import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../constants/constants';

const AllGatePasses = () => {
  const [gatePasses, setGatePasses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGatePasses();
  }, []);

  const fetchGatePasses = () => {
    fetch(`${BASE_URL}/fetchGatePass`)
      .then((response) => response.json())
      .then((data) => {
        setGatePasses(data.gatePass);
      })
      .catch((error) => {
        setError('Error fetching gate pass. Please try again.');
      });
  };

  return (
    <div className="p-4 mt-10 ml-64 body">
      <div className="row">
        {gatePasses.map((gatePass) => (
          <div className="col-3" key={gatePass.id}>
            <div className="card border-0 shadow-lg p-3 mb-5 bg-white rounded" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">Gate Pass ID: {gatePass.id}</h5>
                <p className="card-text">Issued By: {gatePass.issueBy}</p>
                <p className="card-text">Issue At: {gatePass.issueAt}</p>
                <p className="card-text">Depot: {gatePass.Depot}</p>
                <p className="card-text">Product Type: {gatePass.productType}</p>
                <p className="card-text">Quantity Leaving: {gatePass.quantityLeaving}</p>
                <p className="card-text">Destination: {gatePass.destination}</p>
                <p className="card-text">Vehicle Details: {gatePass.vehicleDetails}</p>
                <p className="card-text">Recipient Details: {gatePass.recipientEmail}</p>
                <a href="#" className="btn btn-primary">View Gate Pass</a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default AllGatePasses;
