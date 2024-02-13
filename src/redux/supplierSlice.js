

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invoiceData: {
    invoiceNumber: '',
    date: new Date(),
    billingDate: new Date(),
    dueDate: new Date(),
  
    subtotal: 0,
    tax: 0,
    total: 0,
    currency: 'KSH',
  },
  rows: [
    { description: '', unitPrice: '', quantity: '', total: '' },
  ],
};

const supplierSlice = createSlice({
  name: 'supply',
  initialState,
  reducers: {
    setInvoiceData: (state, action) => {
      state.invoiceData = { ...state.invoiceData, ...action.payload };
    },
    setRows: (state, action) => {
      state.rows = action.payload;
    },
    setTotals: (state, action) => {
      state.invoiceData.subtotal = action.payload.subtotal;
      state.invoiceData.tax = action.payload.tax;
      state.invoiceData.total = action.payload.total;
    },
    setCurrency: (state, action) => {
      state.invoiceData.currency = action.payload;
    },
  },
});

export const { setInvoiceData, setRows, setTotals, setCurrency } = supplierSlice.actions;

export default supplierSlice.reducer;
