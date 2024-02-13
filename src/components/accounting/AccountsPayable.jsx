import React from 'react';

const AccountsPayable = () => {
  // Sample data for accounts payable
  const accountsPayable = [
    { id: 1, vendor: 'Vendor A', dueDate: '2023-09-15', amount: 800 },
    { id: 2, vendor: 'Vendor B', dueDate: '2023-08-20', amount: 600 },
    // ... more accounts payable
  ];

  return (
    <div>
      <h2>Accounts Payable</h2>
      <table>
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Due Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {accountsPayable.map((account) => (
            <tr key={account.id}>
              <td>{account.vendor}</td>
              <td>{account.dueDate}</td>
              <td>{account.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountsPayable;
