import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PolarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const data = {
      labels: ['Invoices', 'users', 'fuel transactions', 'Gate passes', 'LPO'],
      datasets: [{
        label: 'Supplies',
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ]
      }]
    };

    const config = {
      type: 'polarArea',
      data: data,
      options: {}
    };

    // Destroy previous chart instance if it exists
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    chartRef.current.chart = new Chart(ctx, config);
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <>
      <canvas ref={chartRef} id="polarChart"></canvas>
    </>
  );
};

export default PolarChart;
