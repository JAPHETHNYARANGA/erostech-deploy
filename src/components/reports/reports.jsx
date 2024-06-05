import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../constants/constants';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import InfoDialog from '../Dialogs/infoDialog';
import ErrorDialog from '../Dialogs/errorDialog';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function Reports() {
  const [selectedOption, setSelectedOption] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const token = Cookies.get('token');
  const navigate = useNavigate();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const dateFormat = selectedOption === 'yearly'? 'yyyy' : (selectedOption === 'monthly'? 'MM/yyyy' : 'dd/MM/yyyy');
  const formattedDate = selectedDate.toISOString().split('T')[0];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/generateReports`,
        {
          reportType: selectedOption,
          date: selectedDate,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          responseType: 'blob' // Set response type to blob to handle PDF response
        }
      );
  
      // Check if response content type is PDF
      if (response.headers['content-type'] === 'application/pdf') {
        // Handle PDF response
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(pdfBlob);
        window.open(url);
      } else {
        // Handle JSON response
        if (response.data.success) {
          setShowSuccess(true);
          console.log(response);
          setTimeout(() => {
            setShowSuccess(false);
            navigate('/reports');
          }, 3000);
        } else {
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 3000);
        }
      }
    } catch (error) {
      console.error('Error generating reports:', error);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="p-4 mt-8 ml-64 body">
      <h3>Generate Reports</h3>
      <InfoDialog message="Reports generated successfully" show={showSuccess} />
      <ErrorDialog message="Something went wrong. Please try again later." show={showError} />
      <div className="mb-4">
        <label htmlFor="reportType" className="block font-medium mb-1">Select Report Type:</label>
        <select id="reportType" value={selectedOption} onChange={handleOptionChange} className="w-full border rounded-lg py-2 px-3">
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="datePicker" className="block font-medium mb-1">Select Date:</label>
        <DatePicker
          id="datePicker"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat={selectedOption === 'yearly' ? 'yyyy' : (selectedOption === 'monthly' ? 'MM/yyyy' : 'dd/MM/yyyy')}
          className="w-full border rounded-lg py-2 px-3"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>
    </div>
  );
}

export default Reports;
