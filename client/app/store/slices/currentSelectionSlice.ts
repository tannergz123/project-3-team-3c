import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentSelectionState {
  selectedSize: string | null; // e.g., "Bowl", "Plate"
  entrees: { [key: string]: number }; // e.g., { "Orange Chicken": 2 }
  sides: { [key: string]: number };   // e.g., { "Fried Rice": 1 }
  appetizers: { [key: string]: number }; // e.g., { "Spring Rolls": 2 }
  drinks: { [key: string]: number };     // e.g., { "Coke": 1 }
}

const initialState: CurrentSelectionState = {
  selectedSize: null,
  entrees: {},
  sides: {},
  appetizers: {},
  drinks: {},
};

const currentSelectionSlice = createSlice({
  name: 'currentSelection',
  initialState,
  reducers: {
    setSelectedSize(state, action: PayloadAction<string | null>) {
      state.selectedSize = action.payload;
    },
    setEntreeQuantity(state, action: PayloadAction<{ name: string; quantity: number }>) {
      state.entrees[action.payload.name] = action.payload.quantity;
    },
    setSideQuantity(state, action: PayloadAction<{ name: string; quantity: number }>) {
      state.sides[action.payload.name] = action.payload.quantity;
    },
    setAppetizerQuantity(state, action: PayloadAction<{ name: string; quantity: number }>) {
      state.appetizers[action.payload.name] = action.payload.quantity;
    },
    setDrinkQuantity(state, action: PayloadAction<{ name: string; quantity: number }>) {
      state.drinks[action.payload.name] = action.payload.quantity;
    },
    resetSelections(state) {
      state.selectedSize = null;
      state.entrees = {};
      state.sides = {};
      state.appetizers = {};
      state.drinks = {};
    },
  },
});

export const {
  setSelectedSize,
  setEntreeQuantity,
  setSideQuantity,
  setAppetizerQuantity,
  setDrinkQuantity,
  resetSelections,
} = currentSelectionSlice.actions;

export default currentSelectionSlice.reducer;