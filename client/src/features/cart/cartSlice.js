import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  cartItems: [],
  isLoading: null,
  count: 0,
};
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (options) => {
    if (options) {
      const response = await axios.get(
        `/api/items?limit=${options.limit}&sort=${options.sort}&skip=${
          options.skip
        }&filters=${""}`
      );
      return response.data;
    }
    const response = await axios.get("/api/items");
    return response.data;
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
    clearCartItem: (state, action) => {
      state.cartItems = null; //deleting by id
    },
    addCartItem: (state, action) => {
      state.cartItems.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(getCartItemsCount.fulfilled, (state, action) => {
        return { ...state, count: action.payload.count };
      });
  },
});

export const selectCart = (state) => state.cart;
export const { clearCartItem, addCartItem } = cartSlice.actions;
export default cartSlice.reducer;
