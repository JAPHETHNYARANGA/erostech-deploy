import React from 'react';
import Cookies from 'js-cookie'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import NavBar from './components/navigation/Navbar';

import InventoryForm from './components/inventory/InventoryForm';
import InventoryList from './components/inventory/InventoryList';

import Login from './components/authentication/Login'
import Register from './components/authentication/Register';
import Dashboard from './components/dashboard/Dashboard';

import Customers from './components/customer/Customers';
import Companies from './components/company/Companies';
import CustomerEnquiry from './components/sales/CustomerEnquiry';
import ProformaInvoice from './components/sales/ProformaInvoice';
import OrderConfirmation from './components/sales/OrderConfirmation';
import PaymentReceived from './components/sales/PaymentReceived';
import LoadAuthority from './components/sales/LoadAuthority';
import Settings from './components/Settings';
import Invoices from './components/invoices/Invoices';




import SalesInvoice from './components/sales/SalesInvoice';


import Gatepass from './components/gatepass/Gatepass';
import Depots from './components/Depots';


import FuelMovement from './components/secondary-pages/fuel-movement';
import SetBalance from './components/secondary-pages/setBalance';
import Users from './components/users/users';
import Password from './components/authentication/password';
import Messages from './components/messaging/messages';
import Supplies from './components/supplies/supplies';
import ProfomaInvoice from './components/invoices/profomaInvoice';
import FinalInvoice from './components/invoices/finalInvoice';
import GatePassForm from './components/gatepass/Gatepass';
import AllGatePasses from './components/gatepass/AllGatePasses';
import TransactonsHistory from './pages/Transactions/transactonsHistory';


const App = () => {

  const PrivateRoute = ({ element, path }) => {
    const isAuthenticated = Cookies.get('token') !== undefined; // Check if the token cookie exists
  
    return isAuthenticated ? element : <Navigate to="/" />; // Redirect to login if not authenticated
  };
  

  return (
   
      <Router>
        
        <Routes>
          <Route path="/dashboard" element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <Dashboard />
                  </React.Fragment>
                }
              />
            }
          />

          <Route path="/inventory"
            element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <InventoryList />
                  </React.Fragment>
                }
              />
            }
          />
          
          <Route path="/inventory/add" element={<InventoryForm />} />
         
          <Route path="/reset/:token" element={<Password />} />

          <Route path="" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        
          <Route path="/customer-data" element={<Customers />} />
          <Route path="/company-data" element={<Companies />} />
          
          <Route path="/customer-enquiry" element={<CustomerEnquiry />} />
          <Route path="/proforma-invoice" element={<ProformaInvoice />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/payment-received" element={<PaymentReceived />} />
          <Route path="/load-authority" element={<LoadAuthority />} />
          <Route path="/generate-invoice" element={<Invoices />} />
          <Route path="/generate-gate-pass" element={<GatePassForm />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/users"
            element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <Users />
                  </React.Fragment>
                }
              />
            }
          />
         
        
          <Route path="/invoices"
            element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <Invoices />
                  </React.Fragment>
                }
              />
            }
          />
        
        <Route path="/final-invoice"
            element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <FinalInvoice />
                  </React.Fragment>
                }
              />
            }
          />

        <Route path="/profoma-invoice"
            element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <ProfomaInvoice />
                  </React.Fragment>
                }
              />
            }
          />
         
          <Route path="/supplies"
            element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <Supplies />
                  </React.Fragment>
                }
              />
            }
          />
         

          <Route path="/messages"
            element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <Messages />
                  </React.Fragment>
                }
              />
            }
          />

          <Route path="/allgatepasses"
            element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <AllGatePasses />
                  </React.Fragment>
                }
              />
            }
          />

          <Route path="/gatepass"
            element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <Gatepass />
                  </React.Fragment>
                }
              />
            }
          />

          <Route path="/depots"
            element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <Depots />
                  </React.Fragment>
                }
              />
            }
          />
          <Route path="/transactions-history"
            element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <TransactonsHistory />
                  </React.Fragment>
                }
              />
            }
          />



          {/* secondary pages */}

          <Route path="/fuel-balance"
            element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <SetBalance />
                  </React.Fragment>
                }
              />
            }
          />

          <Route path="/fuel-movement"
            element={
              <PrivateRoute
                element={
                  <React.Fragment>
                    <NavBar />
                    <FuelMovement />
                  </React.Fragment>
                }
              />
            }
          />


        </Routes>
      </Router>
  
  );
};

export default App;
