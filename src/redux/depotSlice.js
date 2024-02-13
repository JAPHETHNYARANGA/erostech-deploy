import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  depots: [
    {
      name: 'VTTI',
      location: 'Mombasa',
      contact: 'vtti@example.com',
      products: {
        Diesel: 1000,
        Super: 0,
        Kerosene: 0,
      },
    },
    {
      name: 'GAPCO',
      location: 'Mombasa',
      contact: 'gapco@example.com',
      products: {
        Diesel: 1200,
        Super: 600,
        Kerosene: 900,
      },
    },
    {
      name: 'Oilcom',
      location: 'Nairobi',
      contact: 'oilcom@example.com',
      products: {
        Diesel: 800,
        Super: 400,
        Kerosene: 700,
      },
    },
    {
      name: 'Lake Oil',
      location: 'Nairobi',
      contact: 'lakeoil@example.com',
      products: {
        Diesel: 900,
        Super: 450,
        Kerosene: 750,
      },
    },
    {
      name: 'Konza',
      location: 'Konza',
      contact: 'konza@example.com',
      products: {
        Diesel: 600,
        Super: 300,
        Kerosene: 500,
      },
    },
  ],
  mainLine: {
    Diesel: 5000,
    Super: 2500,
    Kerosene: 4000,
  },
};

const depotSlice = createSlice({
  name: 'depot',
  initialState,
  reducers: {
    adjustProductQuantity: (state, action) => {
      const { depotIndex, productType, amount } = action.payload;
      const currentQuantity = state.depots[depotIndex].products[productType];
      state.depots[depotIndex].products[productType] = currentQuantity + amount;
    },
    setProductQuantity: (state, action) => {
      const { depotIndex, productType, quantity } = action.payload;
      state.depots[depotIndex].products[productType] = quantity;
    },
    adjustMainLineQuantity: (state, action) => {
      const { productType, amount } = action.payload;
      const currentQuantity = state.mainLine[productType];
      state.mainLine[productType] = currentQuantity + amount;
    },
    deductSelectedQuantities: (state, action) => {
      const { selectedDepot } = action.payload;
      const updatedDepots = state.depots.map((depot) => {
        if (depot.name === selectedDepot.name) {
          const updatedProducts = { ...depot.products };
          Object.entries(updatedProducts).forEach(([productType, product]) => {
            if (product.selectedQuantity) {
              updatedProducts[productType].quantity -= product.selectedQuantity;
              updatedProducts[productType].selectedQuantity = 0;
            }
          });
          return { ...depot, products: updatedProducts };
        }
        return depot;
      });
      return { ...state, depots: updatedDepots };
    },
  },
});

export const {
  adjustProductQuantity,
  setProductQuantity,
  adjustMainLineQuantity,
  deductSelectedQuantities
} = depotSlice.actions;
export default depotSlice.reducer;
