// redux/gatepassSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gatepassData: null,
};

const gatepassSlice = createSlice({
  name: 'gatepass',
  initialState,
  reducers: {
    generateGatepass: (state, action) => {
      // Generate a gatepass based on the invoice data
      const { invoiceData } = action.payload;

      const gatepassData = {
        date: new Date(),
        description: 'Gatepass for Invoice',
        invoiceData,
      };

      state.gatepassData = gatepassData;
    },
  },
});

export const { generateGatepass } = gatepassSlice.actions;
export const selectGatepassData = (state) => state.gatepass.gatepassData;
export default gatepassSlice.reducer;
