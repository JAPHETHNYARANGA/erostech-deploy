import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Importing Chart.js

const NewLineChart = () => {
  const chartRef = useRef(null); // Reference to the canvas element

  useEffect(() => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    const ctx = chartRef.current; // Accessing the canvas element

    // Check if a Chart instance already exists on the canvas
    if (ctx) {
      // If a Chart instance exists, destroy it
      const chartInstance = Chart.getChart(ctx);
      if (chartInstance) {
        chartInstance.destroy();
      }
    }

    // Create a new Chart instance
    const newChartInstance = new Chart(ctx, {
      type: 'line',
      data: data,
    });

    // Cleanup function to destroy the chart instance when component unmounts
    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef}></canvas>; // Use ref instead of id
};

export default NewLineChart;
