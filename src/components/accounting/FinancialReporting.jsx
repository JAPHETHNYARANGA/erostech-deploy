import React from 'react';

const FinancialReporting = () => {
  // Sample data for financial reports
  const balanceSheet = {
    assets: 10000,
    liabilities: 5000,
    equity: 5000,
  };

  const incomeStatement = {
    revenue: 15000,
    expenses: 8000,
    netIncome: 7000,
  };

  return (
    <div>
      <h2>Financial Reporting</h2>
      <div>
        <h3>Balance Sheet</h3>
        <p>Assets: {balanceSheet.assets}</p>
        <p>Liabilities: {balanceSheet.liabilities}</p>
        <p>Equity: {balanceSheet.equity}</p>
      </div>
      <div>
        <h3>Income Statement</h3>
        <p>Revenue: {incomeStatement.revenue}</p>
        <p>Expenses: {incomeStatement.expenses}</p>
        <p>Net Income: {incomeStatement.netIncome}</p>
      </div>
    </div>
  );
};

export default FinancialReporting;
