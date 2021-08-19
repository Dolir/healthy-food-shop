import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key));
};
const initialState = {
  cartItems: localStorage.getObj("cart") ? localStorage.getObj("cart") : [],
  isLoading: null,
  count: 0,
};
export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async (item) => {
    await axios.post("/api/auth/cart", item);
    return item.item;
  }
);
export const clearCartItem = createAsyncThunk(
  "cart/clearCartItem",
  async (item) => {
    await axios.delete(
      `/api/auth/cart?itemID=${item.itemID}&userID=${item.userID}`
    );
    return item.itemID;
  }
);
export const getCartItemsCount = createAsyncThunk(
  "cart/getCartItemsCount",
  async (options) => {
    const filters = JSON.stringify(options.filters);
    const response = await axios.get(`/api/items/count?filters=${filters}`);
    return response.data;
  }
);
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // clearCartItem: (state, action) => {
    //   state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
    //   localStorage.removeItem("cart");
    //   localStorage.setObj(
    //     "cart",
    //     state.cartItems.filter((x) => x._id !== action.payload)
    //   );
    // },
    clearCart: (state, action) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },
    updateCartItemQuantity: (state, action) => {
      const chosenIndex = state.cartItems.findIndex(
        (x) => x._id === action.payload.id
      );
      state.cartItems[chosenIndex].quantity = parseInt(action.payload.quantity);
      localStorage.removeItem("cart");
      localStorage.setObj("cart", state.cartItems);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCartItem.fulfilled, (state, action) => {
        localStorage.setObj("cart", [...state.cartItems, action.payload]);
        state.cartItems.push(action.payload);
      })
      .addCase(clearCartItem.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (x) => x._id !== action.payload
        );
        localStorage.removeItem("cart");
        localStorage.setObj(
          "cart",
          state.cartItems.filter((x) => x._id !== action.payload)
        );
      })
      .addCase(getCartItemsCount.fulfilled, (state, action) => {
        return { ...state, count: action.payload.count };
      });
  },
});

export const selectCart = (state) => state.cart;
export const { updateCartItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
