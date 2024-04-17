import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../constants/constants';
import axios from 'axios';


const Password = () => {

  const { token } = useParams();
  const croppedToken = token.substring(2);
 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassowrd, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/set-password/${croppedToken}`, {
        firstName: firstName,
        lastName: lastName,
        password : password
      });

      // Assuming the response contains a token or user data
      console.log(response.data);
      if(response.status){
        navigate('/');
      }else{

      }

      // Redirect or handle success based on the response
      // navigate('/dashboard'); 
    } catch (error) {
      console.error('Set password failed:', error.response.data.message);
      console.log("the token is" + croppedToken)
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="p-6 max-w-md w-full bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Set Password</h2>
    
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="w-full border rounded-lg py-2 px-3"
            value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="w-full border rounded-lg py-2 px-3"
            value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border rounded-lg py-2 px-3"
            value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-1">
           Confirm Password
          </label>
          <input
            type="password"
            id="Confirmpassword"
            className="w-full border rounded-lg py-2 px-3"
            value={confirmPassowrd}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Set Password
            </button>
          )}
      </form>
    </div>
  </div>
  );
};

export default Password;
