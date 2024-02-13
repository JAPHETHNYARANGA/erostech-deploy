import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Sidebar from './Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { update } from '../../redux/userSlice';
import Cookies from 'js-cookie';






function Navbar() {
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  // const [user, setUser] = useState(null); 
  const navigate = useNavigate();
  const user = useSelector(state => state.user);  
  const dispatch = useDispatch();
  const [signOutMessage, setSignOutMessage] = useState(null);

 


  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/member_details');
      dispatch(update(response.data)); 
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [dispatch]);


  const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1OTVlZDMzMC05MTIzLTQ1MzItODk2Yi0xZjNlNmQwYzEwMDAiLCJzdWIiOiIzOCIsInNjcCI6InVzZXIiLCJhdWQiOm51bGwsImlhdCI6MTcwMjMxMTE1NywiZXhwIjoxNzAyMzE4MzU3fQ.G10EyAteluOuf6gCd6FxaXo-AdbPHG-PplLYxykFjqE'; 
localStorage.setItem('accessToken', accessToken);

// const accessToken = localStorage.getItem('accessToken');

// Define the handleSignOut function using the accessToken variable
const handleSignout = async () => {
  try {
    if (!accessToken) {
      console.error('Access token not found.');
      return; // Exit function if accessToken is not available
    }

    // Make a DELETE request to the sign-out endpoint on your server
    const response = await fetch('/users/sign_out', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
        // Add other headers if necessary
      }
    });

    if (response.ok) {
      // Clear the access token from localStorage on successful sign-out
      localStorage.removeItem('accessToken');
      return { success: true, message: 'Sign-out successful.' };
    } else {
      throw new Error('Sign-out failed.');
    }

  } catch (error) {
    return { success: false, message: 'Sign-out failed. Please try again.' };
  }
};


const handleSignOutClick = async () => {
  const signOutResult = await handleSignout();

  Cookies.remove('token');

  if (signOutResult.success) {
    setSignOutMessage({ type: 'success', text: signOutResult.message });
  } else {
    setSignOutMessage({ type: 'error', text: signOutResult.message });
  }

  // Optionally, you can clear the message after a certain duration
  setTimeout(() => {
    setSignOutMessage(null);
  }, 5000); // Clear message after 5 seconds
};
  
  
  
  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>

              {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="FlowBite Logo" /> */}
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                EROSTECH
              </span>
            </div>
            <div className="flex items-center">
             
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded={isUserDropdownOpen ? 'true' : 'false'}
                  data-dropdown-toggle="dropdown-user"
                  onClick={toggleUserDropdown}>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user?.image || 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'} 
                    alt="user photo"/>
                </button>

                {isUserDropdownOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-dropdown"
                  >
                    <div className="px-4 py-3" role="none">
                      <p className="text-sm text-gray-900 dark:text-white" role="none">
                        {user?.name || 'Loading...'} 
                      </p>
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                        {user?.email || 'Loading...'} 
                      </p>
                    </div>
                    <ul className="py-1" role="none">
                    <li>
              <Link
                to="/dashboard" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem">
                Dashboard
              </Link>
            </li>
                      <Link to="/settings"><li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Settings
                        </a>
                      </li></Link>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Earnings
                        </a>
                      </li>
                      <li>

                      <Link to="/">
                        <button
                          onClick={handleSignOutClick}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
                          Sign Out
                        </button>
                      </Link>
          
                      {signOutMessage && (
                    <div className={signOutMessage.type === 'success' ? 'text-green-500 px-4 py-2 text-sm ' : 'text-red-500 px-4 py-2 text-sm '}>
                      {signOutMessage.text}
                    </div>
                  )}
        
       
                </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-12 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar">
        <Sidebar />
      </aside>
    </div>
  );
}

export default Navbar;
