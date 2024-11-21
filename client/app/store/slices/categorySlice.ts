// store/slices/categorySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  selectedCategory: string;
}

const initialState: CategoryState = {
  selectedCategory: "Entrees", // Default category
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    selectCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
  },
});

export const { selectCategory } = categorySlice.actions;
export default categorySlice.reducer;
