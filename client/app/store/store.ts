// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice'
import currentSelectionReducer from './slices/currentSelectionSlice';
import orderReducer from './slices/orderSlice';
import itemsReducer from './slices/itemsSlice';

const store = configureStore({
  reducer: {
    category: categoryReducer,
    currentSelection: currentSelectionReducer,
    order: orderReducer,
    items: itemsReducer,
  },
});

// Export the store types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
