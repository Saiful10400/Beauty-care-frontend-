// src/redux/slices/cartSlice.ts
import { TorderProduct } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Example cart product type
 

interface CartState {
  items: TorderProduct[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add or increment quantity
    addToCart: (state, action: PayloadAction<TorderProduct>) => {
      const existing = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    // Remove an item
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },
    // Increment quantity
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const existing = state.items.find(
        (item) => item.productId === action.payload
      );
      if (existing) {
        existing.quantity += 1;
      }
    },
    // Decrement quantity
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const existing = state.items.find(
        (item) => item.productId === action.payload
      );
      if (existing && existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        // If quantity reaches 0 or less, remove the item
        state.items = state.items.filter(
          (item) => item.productId !== action.payload
        );
      }
    },
    // Clear the cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
