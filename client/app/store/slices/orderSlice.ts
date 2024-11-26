import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderItem } from '../../Types/orderTypes';

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
      const { name, entrees, sides } = action.payload;

      // Generate a unique identifier for the item based on its properties
      const uniqueIdentifier = JSON.stringify({ name, entrees, sides });

      // Check if an item with the same identifier already exists in the cart
      const existingItem = state.items.find(
        (item) =>
          JSON.stringify({ name: item.name, entrees: item.entrees, sides: item.sides }) ===
          uniqueIdentifier
      );

      if (existingItem) {
        // Update the quantity of the existing item
        existingItem.quantity += action.payload.quantity;
      } else {
        // Add the new item to the cart
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
    resetCart(state) {
      // Clear all items in the cart
      state.items = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateCartItem, resetCart } = orderSlice.actions;
export default orderSlice.reducer;
