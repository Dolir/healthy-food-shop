import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  items: [],
  isLoading: null,
  count: 0,
  priceRange: { min: 0, max: 1 },
};
export const getItems = createAsyncThunk("items/getItems", async (options) => {
  if (options) {
    const response = await axios.get(
      `/api/items?limit=${options.limit}&sort=${options.sort}&skip=${options.skip}`
    );
    return response.data;
  }
  const response = await axios.get("/api/items");
  return response.data;
});

export const getItemsCount = createAsyncThunk(
  "items/getItemsCount",
  async () => {
    const response = await axios.get("/api/items/count");
    return response.data;
  }
);
export const getMaxPrice = createAsyncThunk("items/getMaxPrice", async () => {
  const response = await axios.get("/api/items/maxprice");
  return response.data;
});
export const getMinPrice = createAsyncThunk("items/getMinPrice", async () => {
  const response = await axios.get("/api/items/minprice");
  return response.data;
});
export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(getItemsCount.fulfilled, (state, action) => {
        return { ...state, count: action.payload.count };
      })
      .addCase(getMaxPrice.fulfilled, (state, action) => {
        state.priceRange.max = parseInt(action.payload.price);
      })
      .addCase(getMinPrice.fulfilled, (state, action) => {
        state.priceRange.min = parseInt(action.payload.price);
      });
  },
});
export const selectPriceRange = (state) => state.items.priceRange;
export const selectItems = (state) => state.items;
export default itemsSlice.reducer;
