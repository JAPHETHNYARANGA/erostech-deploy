import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useDispatch, useSelector } from 'react-redux';
import { setInvoiceData, setRows, setTotals, setCurrency } from '../../redux/invoiceSlice'
import { selectCustomerData } from '../../redux/customerSlice';



const proformaInvoice = () => {

  const customerName = useSelector((state) => state.customer.name);
  const customerPhone = useSelector((state) => state.customer.phone);
  const customerEmail = useSelector((state) => state.customer.email);
  const customerCategory = useSelector((state) => state.customer.category);
  // const [invoiceData, setInvoiceData] = useState({
  //   invoiceNumber: '',
  //   date: new Date(),
  //   billingDate: new Date(),
  //   dueDate: new Date(),
  //   description: '',
  //   unitPrice: '',
  //   quantity: '',
  //   total: '',
  //   supplierName: '',
  //   // customerEmail: '',
  //   // customerPhone: '',
  // });

  const dispatch = useDispatch();
  const invoiceData = useSelector((state) => state.supplier.invoiceData);
  const rows = useSelector((state) => state.supplier.rows);
  const totals = useSelector((state) => state.supplier.invoiceData);
  const currency = useSelector((state) => state.supplier.invoiceData);
  // const [supplyType, setSupplyType] = useState('KSH');

  // const [rows, setRows] = useState([
  //   { description: '', unitPrice: '', quantity: '', total: '' },
  // ]);

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setInvoiceData({ ...invoiceData, [name]: value }));
  };

  const handleDueDateChange = (date) => {
    dispatch(setInvoiceData({ ...invoiceData, dueDate: date }));
  };

  const addRow = () => {
    dispatch(setRows([...rows, { description: '', unitPrice: '', quantity: '', total: '' }]));
  };

  const handleSupplyTypeChange = (e) => {
    dispatch(setCurrency(e.target.value));
  };

  const handleTableRowChange = (index, fieldName, value) => {
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        const updatedRow = {
          ...row,
          [fieldName]: value,
        };
  
        if (fieldName === 'unitPrice' || fieldName === 'quantity') {
          const unitPrice = parseFloat(updatedRow.unitPrice || 0);
          const quantity = parseFloat(updatedRow.quantity || 0);
          updatedRow.total = (unitPrice * quantity).toFixed(2);
        }
        return updatedRow;
      }
      return row;
    });
  
    dispatch(setRows(updatedRows));
  };
  
  

  const formatCurrency = (amount) => {
    if (customerCategory === 'local') {
      return `KSH ${parseFloat(amount).toFixed(2)}`;
    } else if (customerCategory === 'export') {
      return `USD ${parseFloat(amount).toFixed(2)}`;
    } else {
    
      return `KSH ${parseFloat(amount).toFixed(2)}`;
    }
  };

  const deleteRow = (index) => {
    const updatedRows = rows.filter((row, i) => i !== index);
    dispatch(setRows(updatedRows))
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontSize(16);
    doc.text('Proforma Invoice', 20, 20);
    doc.setFontSize(10);
  
    // Add customer information
    doc.text(`Customer Name: ${customerName}`, 20, 30);
    doc.text(`Customer Email: ${customerEmail}`, 20, 40);
    doc.text(`Customer Phone: ${customerPhone}`, 20, 50);
  
    // Rest of your PDF content
    doc.text(`Invoice Number: ${invoiceData.invoiceNumber}`, 20, 70);
    doc.text(`Date: ${invoiceData.date.toDateString()}`, 20, 80);
    doc.text(`Due Date: ${invoiceData.dueDate.toDateString()}`, 20, 90);
 
  
    doc.setFontSize(14);
    const columns = ['Description', 'Unit Price', 'Quantity', 'Total'];
  
    const tableData = rows.map((row) => [
      row.description,
      row.unitPrice,
      row.quantity,
      row.total,
    ]);
  
    doc.autoTable({
      head: [columns],
      body: tableData,
      startY: 120,
    });
  
    const pdfOutput = doc.output();
    const blob = new Blob([pdfOutput], { type: 'application/pdf' });
  
    // Create a link element and set its attributes to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'proforma_invoice.pdf';
    link.click();
  };
  
  

  useEffect(() => {
    // Calculate totals when rows or invoiceData change
    const calculateTotals = () => {
      let subtotal = 0;
      rows.forEach((row) => {
        const total = parseFloat(row.unitPrice) * parseFloat(row.quantity);
        subtotal += total;
      });

      const tax = subtotal * 0.16;
      const total = subtotal 

    
      dispatch(setTotals({ subtotal, tax, total }));
    };

    calculateTotals();
  }, [rows, dispatch, invoiceData]);
  

 
  

  return (
    <div className="container mx-auto mt-24 px-4">
      <h2 className="text-3xl mb-4">Proforma Invoice</h2>

      <div className="mb-4 flex justify-between">
        <div>
          <label htmlFor="invoiceNumber" className="block mb-1">
            Invoice Number:
          </label>
          <input
            type="text"
            id="invoiceNumber"
            name="invoiceNumber"
            value={invoiceData.invoiceNumber}
            onChange={handleInputChange}
            className="w-max border rounded p-2"
          />
        </div>
        <div className="flex">
          <div className="mb-4 mr-2">
            <label htmlFor="date" className="block mb-1">
              Date:
            </label>
            <DatePicker
              selected={invoiceData.date}
              onChange={(date) => setInvoiceData({ ...invoiceData, date })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dueDate" className="block mb-1">
              Due Date:
            </label>
            <DatePicker
              selected={invoiceData.dueDate}
              onChange={handleDueDateChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
       
        {customerName && (
  <div className="mb-4 flex justify-between">
    <label htmlFor="customerName" className="block mb-1">
      Customer Name:
    </label>
    <span className="font-bold text-right ml-1">{customerName}</span>
  </div>
)}

      </div>
      <h3 className="text-xl mb-2">Invoice Table</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Unit Price</th>
            <th className="px-4 py-2">Quantity(in litres)</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={row.description}
                  onChange={(e) =>
                    handleTableRowChange(index, 'description', e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.unitPrice}
                  onChange={(e) =>
                    handleTableRowChange(index, 'unitPrice', e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.quantity}
                  onChange={(e) =>
                    handleTableRowChange(index, 'quantity', e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.total}
                  onChange={(e) =>
                    handleTableRowChange(index, 'total', e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td>
                <button
                  onClick={() => deleteRow(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20"
                  >
                     <svg
      className="w-4 h-4 mr-1"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 20"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
      />
    </svg>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <div>
          <span className="font-semibold text-lg">Subtotal:</span>
          <span>{formatCurrency(totals.subtotal)}</span>
        </div>
        <div>
          <span className="font-semibold text-lg">Tax:</span>
          <span>{formatCurrency(totals.tax)}</span>
        </div>
        <div>
          <span className="font-semibold text-lg">Total:</span>
          <span>{formatCurrency(totals.total)}</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={addRow}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Add Row
        </button>
        <button
  onClick={handleGeneratePDF}
  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mt-2 ml-4 text-sm"
>
  Generate PDF
</button>




  <div className="mb-4">
  <label htmlFor="supplyType" className="block mb-1">
    currency:
  </label>
  <select
    id="supplyType"
    name="supplyType"
    value={invoiceData.currency}
    onChange={handleSupplyTypeChange}
    className="w-full border rounded p-2"
  >
    <option value="KSH">KSH</option>
    <option value="USD">USD</option>
  </select>
</div>
 

 <Link to="/order-confirmation">
  <button  className="bg-blue-500 text-white px-4 py-2 rounded mt-4 ml-4">Next</button></Link>

     </div>
    </div>
  );
};

export default proformaInvoice;
