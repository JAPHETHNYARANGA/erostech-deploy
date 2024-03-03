import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/constants';
import Alert from 'react-bootstrap/Alert';
import { Modal } from 'react-bootstrap';
import Paginator from '../Paginator/paginator';
import InfoDialog from '../Dialogs/infoDialog';
import ErrorDialog from '../Dialogs/errorDialog';

const Supplies = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading state

  const [supplies, setSupplies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

   // Function to show success dialog for 3 seconds
   const showSuccessDialog = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000); // Hide after 3 seconds
  };

  // Function to show error dialog for 3 seconds
  const showErrorDialog = () => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 3000); // Hide after 3 seconds
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
  };

  const token = Cookies.get('token');

  useEffect(() => {
    fetchSupplies();
  }, [currentPage]); // Fetch supplies when currentPage changes

  const fetchSupplies = () =>{
    axios.get(`${BASE_URL}/getSupplies?page=${currentPage}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      
      setSupplies(response.data.supplies.data);
      setCurrentPage(response.data.supplies.current_page);
      setLastPage(response.data.supplies.last_page);
    })
    .catch((error) => console.error('Error fetching supplies:', error));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(); // Create FormData object
      formData.append('name', name);
      formData.append('quantity', quantity);
      formData.append('amount', amount);
      formData.append('file', file); // Append file object

      const response = await axios.post(`${BASE_URL}/supplies`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log(response.data);
      if(response.data.success){
        setName('');
        setQuantity('');
        setAmount('');
        setFile('');
        setFileName('');

        fetchSupplies();
        handleClose();

        showSuccessDialog();
      } else {
        setName('');
        setQuantity('');
        setAmount('');
        setFile('');
        setFileName('');
        
        handleClose();

        showErrorDialog();
      }
    } catch (error) {
      console.error('Error creating supply:', error);
      setName('');
      setQuantity('');
      setAmount('');
      setFile('');
      setFileName('');
      handleClose();

      showErrorDialog();
    } finally {
      setLoading(false);
    }
  };

  const fetchFile = (fileName) => {
    // Assuming the file is stored in public/receipts directory
    window.open(`${BASE_URL}/receipts/${fileName}`, '_blank');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 mt-10 ml-64 body">
        <InfoDialog  message={"success"} show={showSuccess} /> 
        <ErrorDialog message={"something went wrong, please check your connection and try again"} show={showError} /> 
      <button onClick={handleShow} className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
        Add Supply
      </button>
      
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {supplies.map((supply) => (
            <tr key={supply.id}>
              <td>{supply.id}</td>
              <td>{supply.name}</td>
              <td>{supply.quantity}</td>
              <td>{supply.amount}</td>
              <td>
                <button onClick={() => fetchFile(supply.file)}><i className="fa fa-eye" aria-hidden="true"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Paginator currentPage={currentPage} lastPage={lastPage} onPageChange={handlePageChange} />
    
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Supply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex items-center justify-center">
            <div className="p-6 max-w-md w-full bg-white shadow-lg rounded-lg">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block font-medium mb-1">Name</label>
                  <input type="text" id="name" className="w-full border rounded-lg py-2 px-3" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block font-medium mb-1">Quantity</label>
                  <input type="number" id="quantity" className="w-full border rounded-lg py-2 px-3" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </div>
                <div className="mb-4">
                  <label htmlFor="number" className="block font-medium mb-1">Amount</label>
                  <input type="number" id="amount" className="w-full border rounded-lg py-2 px-3" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </div>
                <div className="mb-4">
                  <label htmlFor="file" className="block font-medium mb-1">File</label>
                  <input type="file" id="file" className="w-full border rounded-lg py-2 px-3" onChange={handleFileChange} required/>
                  {fileName && <p>Selected File: {fileName}</p>}
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
                    Create
                  </button>
                )}
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Supplies;
