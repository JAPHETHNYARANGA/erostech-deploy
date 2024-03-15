import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { BASE_URL } from '../constants/constants';
import Cookies from 'js-cookie';




const PieChart = () => {
  const chartRef = useRef(null);
  const token = Cookies.get('token');


  const fetchTransactions = () => {
    fetch(`${BASE_URL}/pieChartData`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('data is' + data)
      })
      .catch((error) => console.error('Error fetching pie chart:', error));
  };

  useEffect(() => {
    fetchTransactions();
    const ctx = chartRef.current.getContext('2d');
    const data = {
      labels: ['Fuel Into depo', 'Fuel Out Of Depos'],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        hoverOffset: 4
      }]
    };

    const config = {
      type: 'doughnut',
      data: data,
    };

    // Destroy previous chart instance if it exists
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    chartRef.current.chart = new Chart(ctx, config);
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <>
      <canvas ref={chartRef} id="pieChart"></canvas>
    </>
  );
};

export default PieChart;
