// salesSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    options: {
        chart: {
          type: 'area',
          height: '100%',
          maxWidth: '100%',
          fontFamily: 'Inter, sans-serif',
          dropShadow: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        tooltip: {
          enabled: true,
          x: {
            show: false,
          },
        },
        legend: {
          show: false,
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: "#1C64F2",
            gradientToColors: ["#1C64F2"],
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 6,
        },
        grid: {
          show: false,
          strokeDashArray: 4,
          padding: {
            left: 2,
            right: 2,
            top: 0,
          },
        },
        xaxis: {
          categories: [
            '01 February',
            '02 February',
            '03 February',
            '04 February',
            '05 February',
            '06 February',
            '07 February',
          ],
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: false,
          labels: {
            formatter: function (value) {
              return '$' + value;
            },
          },
        },
      },
  series: [
    {
      name: "Developer Edition",
      data: [/* Initial data */],
      color: "#1A56DB",
    },
    {
      name: "Designer Edition",
      data: [/* Initial data */],
      color: "#7E3BF2",
    },
  ],
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    updateSalesData: (state, action) => {
      // Assuming action.payload contains updated sales data
      return { ...state, ...action.payload };
    },
  },
});

export const { updateSalesData } = salesSlice.actions;
export const selectSalesData = (state) => state.sales;

export default salesSlice.reducer;
