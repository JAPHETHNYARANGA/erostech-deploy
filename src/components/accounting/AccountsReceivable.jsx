import React from 'react';

const AccountsReceivable = () => {
  // Sample data for accounts receivable
  const accountsReceivable = [
    { id: 1, customer: 'Customer X', dueDate: '2023-09-10', amount: 1200 },
    { id: 2, customer: 'Customer Y', dueDate: '2023-08-25', amount: 900 },
    // ... more accounts receivable
  ];

  return (
    <div>
      <h2>Accounts Receivable</h2>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Due Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {accountsReceivable.map((account) => (
            <tr key={account.id}>
              <td>{account.customer}</td>
              <td>{account.dueDate}</td>
              <td>{account.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountsReceivable;
