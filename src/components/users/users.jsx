import React, { useState, useEffect } from 'react';
import '../../styles/users.scss';
import Navbar from '../navigation/Navbar';
import { Link } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';
import { BASE_URL } from '../constants/constants';


function Users() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [alertVariant, setAlertVariant] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false); // State to track loading state


  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const [allUsers, getAllUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
   }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/createUser`, {
        email: email,
        role: role,
      });

      // Assuming the response contains a token or user data
      if(response.data.status){
        setAlertVariant('success');
        setAlertMessage('User Created SuccessFully');

        fetchUsers();

        handleClose(); 

        setEmail('');
        setRole('');

        
      }else{
          //pass error message
          setAlertVariant('danger');
          setAlertMessage('User Creation Failed');
          handleClose(); 

          setEmail('');
          setRole('');
      }

      // Redirect or handle success based on the response
      // navigate('/dashboard'); 
    } catch (error) {
      setAlertVariant('danger');
      setAlertMessage(error);
      handleClose(); 
      
      setEmail('');
      setRole('');
    } finally{
      setLoading(false);
    }
  };

  const fetchUsers = () => {
    fetch(`${BASE_URL}/get-users`)
      .then((response) => response.json())
      .then((data) => {
        getAllUsers(data.user || []);
      })
      .catch((error) => {
        setError('Error fetching users. Please try again.');
      });
  };

  const deleteUser = (id) =>{
    console.log("iser id is" + id)
  }

    const getRoleText = (roleValue) => {
      switch (roleValue) {
        case 1:
          return 'Admin';
        case 2:
          return 'Manager';
        case 3:
          return 'Finance';
        case 4:
          return 'User';
        default:
          return 'N/A';
      }
    };


  return (
    <>
    <Navbar />
    <div className="users p-4 mt-8 ml-64 body">
      {showAlert && (
          <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
            {alertMessage}
          </Alert>
        )}
   
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="flex items-center justify-center ">
          <div className="p-6 max-w-md w-full bg-white shadow-lg rounded-lg">
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border rounded-lg py-2 px-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-medium mb-1">
                  Role
                </label>
                <select
                    id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                  <option selected>Select A role</option>
                  <option value="1">Admin</option>
                  {/* <option value="2">Manager</option>
                  <option value="3">Finance</option> */}
                  <option value="4">User</option>
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
              Add User
            </button>
          )}
            </form>
          </div>
    </div>
          </Modal.Body>
      
      </Modal>

      <h3>Users</h3>
      <Button  onClick={handleShow} className=" bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
        Add User
      </Button>

      <table class="table">
      <thead>
        
              
        <tr>
          <th scope="col">#</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.firstName || 'N/A'}</td>
              <td>{user.lastName || 'N/A'}</td>
              <td>{user.email}</td>
              <td>{getRoleText(user.role)}</td>
              <td>
                <i className="fa fa-trash" aria-hidden="true" onClick={() => deleteUser(user.id)}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
          </>
        );
      }

export default Users;
