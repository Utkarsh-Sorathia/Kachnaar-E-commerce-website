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
      const { id, quantity } = action.payload;
      const existingItemIndex = state.cart.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].quantity += quantity;
      } else {
        state.cart.push({ ...action.payload, quantity: quantity });
      }
      var temp = state.totalItems;
      temp = temp + quantity;
      state.totalItems = temp;
      // state.totalItems = state.totalItems+ quantity;
    },
    removeFromCart: (state, action) => {
      const { cid, quantityToRemove } = action.payload;
      const updatedCart = state.cart.map((item) => {
        if (item.cid === cid) {
          const newQuantity = item.quantity - quantityToRemove;
          return {
            ...item,
            quantity: newQuantity >= 0 ? newQuantity : 0,
          };
        }
        return item;
      });
      state.cart = updatedCart.filter((item) => item.quantity > 0);

      // Recalculate totalItems based on the quantities of items in the updated cart
      state.totalItems = state.cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },

    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
    },
    addProductToList: (state, action) => {
      state.products.push(action.payload);
    },
    updateQuantity: (state, action) => {
      const { productId, newQuantity } = action.payload;
      const productToUpdate = state.cart.find((item) => item.id === productId);

      if (productToUpdate) {
        // Update the quantity of the specified product
        productToUpdate.quantity = newQuantity;
      }
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
  updateQuantity,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectAdmin = (state) => state.admin;
export const selectCart = (state) => state.user.cart;
export const selectProducts = (state) => state.products;

export default userSlice.reducer;
