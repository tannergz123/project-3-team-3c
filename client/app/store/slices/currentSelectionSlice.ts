// store/slices/currentSelectionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentSelectionState {
  selectedSize: string | null; // e.g., "Bowl", "Plate"
  entrees: { [key: string]: number }; // e.g., { "Orange Chicken": 2 }
  sides: { [key: string]: number };   // e.g., { "Fried Rice": 1 }
}

const initialState: CurrentSelectionState = {
  selectedSize: null,
  entrees: {},
  sides: {},
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
    resetSelections(state) {
      state.selectedSize = null;
      state.entrees = {};
      state.sides = {};
    },
  },
});

export const {
  setSelectedSize,
  setEntreeQuantity,
  setSideQuantity,
  resetSelections,
} = currentSelectionSlice.actions;

export default currentSelectionSlice.reducer;
