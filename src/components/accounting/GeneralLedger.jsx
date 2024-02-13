import React from 'react';

const GeneralLedger = () => {
  // Sample data for transactions
  const transactions = [
    { id: 1, date: '2023-08-01', description: 'Sale', amount: 1000 },
    { id: 2, date: '2023-08-02', description: 'Purchase', amount: -500 },
   
  ];

  return (
    <div>
      <h2>General Ledger</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GeneralLedger;
