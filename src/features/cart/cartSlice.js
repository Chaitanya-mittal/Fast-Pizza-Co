import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

//total price , numItems can be easily derived . Hence no need to mention them here as we need to update these too whenever cart changes.

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart = [...state.cart, action.payload];
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((c) => c.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item.quantity === 1) {
        // delete if only one quantity
        state.cart = state.cart.filter(
          (item) => item.pizzaId !== action.payload,
        );
      } else {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCartSize = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getCartValue = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCart = (state) => state.cart.cart;

export const getCurrentItemQuantity = (id) => (state) => {
  return state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
};
