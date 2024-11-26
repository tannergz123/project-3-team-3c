// store/slices/itemsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Item {
  item_name: string;
  item_type: string;
  calories: number;
  protein: string;
}

interface ItemsState {
  items: Item[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: ItemsState = {
  items: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch items
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await fetch('https://project-3-team-3c.onrender.com/items/get-all-items');
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  const data = await response.json();
  return data;
});

// Slice
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch items';
      });
  },
});

export default itemsSlice.reducer;
