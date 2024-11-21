import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderItem } from '../../types/orderTypes';

interface OrderState {
  items: OrderItem[];
}

const initialState: OrderState = {
  items: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<OrderItem>) {
      const existingItem = state.items.find(
        (item) => item.name === action.payload.name
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItemFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.cartItemId !== action.payload);
    },
    updateCartItem(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const item = state.items.find((item) => item.cartItemId === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateCartItem } = orderSlice.actions;
export default orderSlice.reducer;
