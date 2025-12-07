import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  city: null,
  state: null,
  address: null,
  shopInMyCity: null,
  itemsInMyCity: null,
  cartItems: [],
  totalAmout: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setShopInCity: (state, action) => {
      state.shopInMyCity = action.payload;
    },
    setItemsInMyCity: (state, action) => {
      state.itemsInMyCity = action.payload;
    },

    addToCart: (state, action) => {
      const cartItem = action.payload;
      const existingItem = state.cartItems.find((i) => i.id == cartItem.id);
      if (existingItem) {
        existingItem.quantity += cartItem.quantity;
      } else {
        state.cartItems.push(cartItem);
      }

      state.totalAmout = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.id == id);
      if (item) {
        item.quantity = quantity;
      }

      state.totalAmout = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);

      state.totalAmout = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },
  },
});

export const {
  setUserData,
  setCity,
  setState,
  setAddress,
  setShopInCity,
  setItemsInMyCity,
  addToCart,
  updateQuantity,
  removeCartItem,
} = userSlice.actions;
export default userSlice.reducer;
