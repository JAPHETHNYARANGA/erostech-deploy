
import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
  name: 'customer',
  initialState: null,
  reducers: {
    setCustomerData: (state, action) => action.payload,
  },
});

export const { setCustomerData } = customerSlice.actions;
export const selectCustomerData = (state) => state.customer;
export default customerSlice.reducer;

