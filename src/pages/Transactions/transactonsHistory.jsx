import React from 'react';

const TransactonsHistory = () => {
    return (
        <div className="relative overflow-x-auto shadow-md rounded-lg ml-64 mt-16">
          <div className="pb-4 bg-white dark:bg-gray-900 flex justify-between items-center">
            <div>
              <label htmlFor="invoice-search" className="sr-only">Search</label>
              <input
                type="text"
                id="invoice-search"
                className="block p-2 pl-10 text-lg text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for invoices by invoice number"
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* {warning && (
              <div className="bg-red-200 text-red-800 p-2 mb-4 rounded-lg">
                {warning}
              </div>
            )} */}
           
          </div>
          <table className="w-full text-lg text-left text-gray-900 dark:text-gray-400 mt-4">
            <thead className="text-md text-gray-900 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  Invoice Number
                </th>
                <th scope="col" className="p-4">
                  Company
                </th>
             
                <th scope="col" className="p-4">
                  Billing Date
                </th>
                <th scope="col" className="p-4">
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {invoices.map(invoice => ( */}
                <tr 
                // key={invoice.id}
                >
                  {/* <td className="p-4">{invoice.invoiceNumber}</td>
                  <td className="p-4">{invoice.ReceiverCompany}</td>
                  <td className="p-4">{invoice.invoiceDate}</td>
                  <td className="p-4">{invoice.dueDate}</td> */}
                </tr>
              {/* ))} */}
            </tbody>
          </table>
    
        </div>
      );
}

export default TransactonsHistory;
