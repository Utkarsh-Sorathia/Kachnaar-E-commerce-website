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
      state.cart.push(action.payload);
      state.totalItems++;
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.cid !== action.payload.cid);
      state.totalItems--;
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
      const { id, name, price } = action.payload;
      const index = state.products.findIndex((product) => product.id === id);
      if (index !== -1) {
        state.products[index].name = name;
        state.products[index].price = price;
      }
    }
    
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
