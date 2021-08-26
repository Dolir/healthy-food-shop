import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  reviews: [],
  isLoading: null,
};

export const getReviews = createAsyncThunk(
  "reviews/getReviews",
  async (limitNum) => {
    if (limitNum) {
      const response = await axios.get(`/api/items/reviews?limit=${limitNum}`);
      return response.data;
    }
    const response = await axios.get("/api/items/reviews");
    return response.data;
  }
);

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isLoading = false;
      });
  },
});
export const selectReviews = (state) => state.reviews;
export default reviewsSlice.reducer;
