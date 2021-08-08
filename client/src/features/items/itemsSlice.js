import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  items: [],
  status: null,
};
export const getItems = createAsyncThunk("items/getItems", async (limitNum) => {
  if (limitNum) {
    const response = await axios.get(`/api/items?limit=${limitNum}`);
    return response.data;
  }
  const response = await axios.get("/api/items");
  return response.data;
});

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "idle";
      });
  },
});
export const selectItems = (state) => state.items;
export default itemsSlice.reducer;
