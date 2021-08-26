import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  orders: [],
  isLoading: null,
};
export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (userID) => {
    const response = await axios.get(`/api/auth/orders?userID=${userID}`);
    return response.data;
  }
);

export const addOrder = createAsyncThunk("orders/addOrder", async (order) => {
  await axios.post(`/api/auth/orders`, order);
  return order;
});

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.isLoading = false;
      });
  },
});
export const selectOrders = (state) => state.reviews;
export default ordersSlice.reducer;
