import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    user: null,
    admin: null,
    products: [],
    cart: [],
    totalItems: 0,
  },
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.totalItems = 0;
    },
    loginAdmin: (state, action) => {
      state.isAuthenticated = true;
      state.admin = action.payload;
    },
    logoutAdmin: (state) => {
      state.isAuthenticated = false;
      state.admin = null;
    },
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItemIndex = state.cart.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].quantity =+ quantity;
      } else {
        state.cart.push({ ...action.payload, quantity: quantity });
      }
      state.totalItems = quantity;
    },
    removeFromCart: (state, action) => {
      const { cid, quantityToRemove, totalItems } = action.payload;
      const updatedCart = state.cart.map((item) => {
        if (item.cid === cid) {
          return {
            ...item,
            quantity: item.quantity - quantityToRemove,
          };
        }
        return item;
      });
      state.cart = updatedCart.filter((item) => item.quantity > 0);
      state.totalItems -= quantityToRemove;
      if (state.totalItems < 0) {
        state.totalItems = 0;
      } else {
        state.totalItems = state.totalItems;
      }
    },

    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
    },
    addProductToList: (state, action) => {
      state.products.push(action.payload);
    },
    editProduct: (state, action) => {
      const { id, name, price, description } = action.payload;
      const index = state.products.findIndex((product) => product.id === id);
      if (index !== -1) {
        state.products[index].name = name;
        state.products[index].price = price;
        state.products[index].description = description;
      }
    },
  },
});

export const {
  loginAdmin,
  logoutAdmin,
  loginUser,
  logoutUser,
  addToCart,
  removeFromCart,
  removeProduct,
  editProduct,
  addProductToList,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectAdmin = (state) => state.admin;
export const selectCart = (state) => state.user.cart;
export const selectProducts = (state) => state.products;

export default userSlice.reducer;
