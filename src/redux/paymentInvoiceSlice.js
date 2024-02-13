

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
    customerName: '', 
    customerPhone: '',
    customerEmail: '', 
  },
  rows: [
    { description: '', unitPrice: '', quantity: '', total: '' },
  ],
};

const invoiceSlice = createSlice({
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
    setCustomerName: (state, action) => {
      state.invoiceData.customerName = action.payload;
    },
    setCustomerPhone: (state, action) => {
      state.invoiceData.customerPhone = action.payload;
    },
    setCustomerEmail: (state, action) => {
      state.invoiceData.customerEmail = action.payload;
  },
},
});

export const { setInvoiceData, setRows, setTotals, setCurrency, setCustomerEmail, setCustomerPhone, setCustomerName } = invoiceSlice.actions;

export default invoiceSlice.reducer;
