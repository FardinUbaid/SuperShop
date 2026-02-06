import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  isOpen: false
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find(item => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find(item => item.id === product.id);

      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.id !== product.id);
        }
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    closeCart: (state) => {
      state.isOpen = false;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  toggleCart,
  closeCart
} = cartSlice.actions;

export default cartSlice.reducer;
