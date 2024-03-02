import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../constants/constants';
import Cookies from 'js-cookie'; 
import Paginator from '../Paginator/paginator';

const AllGatePasses = () => {
  const [gatePasses, setGatePasses] = useState([]);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const token = Cookies.get('token');

  useEffect(() => {
    fetchGatePasses();
  }, [currentPage]);

  const fetchGatePasses = () => {
    fetch(`${BASE_URL}/fetchGatePass?page=${currentPage}`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("gate pass is", data);
        setGatePasses(data.gatePass.data); // Access the 'data' array
        setCurrentPage(data.gatePass.current_page); 
        setLastPage(data.gatePass.last_page);
      })
      
      .catch((error) => {
        setError('Error fetching gate pass. Please try again.');
      });
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        <Paginator currentPage={currentPage} lastPage={lastPage} onPageChange={handlePageChange} />
      </div>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default AllGatePasses;
