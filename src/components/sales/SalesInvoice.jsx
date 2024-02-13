import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';


const SalesInvoice = () => {
  const customer = useSelector((state) => state.customer);
  const invoice = useSelector((state) => state.invoice.invoiceData);
  const rows = useSelector((state) => state.invoice.rows);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };


  const componentRef = useRef();

  const handleSaveButtonClick = () => {
    const input = componentRef.current;
  
    // Hide buttons before capturing the content
    const buttonsToHide = input.querySelectorAll('button');
    buttonsToHide.forEach((button) => {
      button.style.display = 'none';
    });
  
    const scale = 1.5; 
    const pdf = new jsPDF('portrait', 'mm', 'a4'); 
  
    html2canvas(input, { scale: scale }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
  
     
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      const aspectRatio = canvas.width / canvas.height;
      const imgWidth = width * 3; 
      const imgHeight = imgWidth / aspectRatio;
  
      pdf.addImage(imgData, 'PNG', (width - imgWidth) / 2, (height - imgHeight) / 2, imgWidth, imgHeight);
      pdf.save('sales_invoice.pdf');
  
   
      buttonsToHide.forEach((button) => {
        button.style.display = 'block';
      });
    });
  };
  

  return (
    <div 
    ref={componentRef} 
    className="relative overflow-x-auto shadow-md sm:rounded-lg mt-14 ml-64">
    <div className="sales-invoice w-8/12 bg-white shadow-lg p-6">
      
        <div className=" flex justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-widest text-indigo-500">
              {invoice.customerName}
            </h1>
            <p className="text-base">{invoice.customerEmail}</p>
            <p className="text-base">{invoice.customerPhone}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-2 py-1 bg-gray-200 hover:bg-gray-400">
              Save
            </button>
            <button className="px-2 py-1 bg-gray-200 hover:bg-gray-400">
              Print
            </button>
          </div>
        </div>
        <div className="w-full h-0.5 bg-gray-800 my-4"></div>
        <div className="flex justify-between">
          <div>
            <h6 className="font-bold">
              Invoice Number :{' '}
              <span className="text-sm font-medium">{invoice.invoiceNumber}</span>
            </h6>
            <h6 className="font-bold">
              Invoice Date :{' '}
              <span className="text-sm font-medium">
                {formatDate(invoice.date)}
              </span>
            </h6>
            <h6 className="font-bold">
              Due Date :{' '}
              <span className="text-sm font-medium">
                {formatDate(invoice.dueDate)}
              </span>
            </h6>
          </div>
          <div className="w-40">
            <address className="text-sm">
              <span className="font-bold">Billed To :</span>
              <br />
              {invoice.customerName}
              <br />
              {invoice.customerEmail}
              <br />
              {invoice.customerPhone}
            </address>
          </div>
          <div className="w-40">
            <address className="text-sm">
              <span className="font-bold">Ship To :</span>
              <br />
              {/* Add ship to information if available */}
            </address>
          </div>
        </div>
        <div className="flex justify-center my-4">
          <div className="border-b border-gray-200 shadow w-full">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Unit Price</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{row.description}</td>
                    <td className="px-4 py-2">{row.unitPrice}</td>
                    <td className="px-4 py-2">{row.quantity}</td>
                    <td className="px-4 py-2">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl">Invoice Summary :</h3>
            <h6 className="font-bold">
              Subtotal : <span className="text-sm font-medium">{invoice.subtotal} {invoice.currency}</span>
            </h6>
            <h6 className="font-bold">
              Tax : <span className="text-sm font-medium">{invoice.tax} {invoice.currency}</span>
            </h6>
            <h6 className="font-bold">
              Total : <span className="text-sm font-medium">{invoice.total} {invoice.currency}</span>
            </h6>
          </div>
        </div>
        <div className="w-full h-0.5 bg-gray-800 my-4"></div>
        <div className="p-4">
          <div className="flex items-center justify-center">
            Thank you very much for doing business with us.
          </div>
          <div className="flex items-end justify-end space-x-3">
            <button className="px-4 py-2 text-sm text-green-600 bg-green-100 hover:bg-green-300">Print</button>
            <button
            onClick={handleSaveButtonClick}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-400"
          >
            Save as PDF
          </button>
            <Link to="/load-authority"><button className="px-4 py-2 text-sm text-red-600 bg-red-100 hover:bg-red-300">Cancel</button></Link>
            <Link to="/gatepass">
            <button className="px-4 py-2 text-sm text-blue-600 bg-blue-100 hover:bg-blue-300">
              Next: Gatepass
            </button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesInvoice;
