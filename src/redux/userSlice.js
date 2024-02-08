import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    user: null,
    cart: [] // Add cart state
  },
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.cart = []; // Clear cart on logout
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
    }
  }
});

export const { loginUser, logoutUser, addToCart, removeFromCart } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectCart = (state) => state.user.cart; // Selector for cart state

export default userSlice.reducer;
