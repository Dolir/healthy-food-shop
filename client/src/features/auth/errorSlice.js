import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  error: {},
};
export const returnErrors = createAsyncThunk(
  "error/returnErrors",
  async (response) => {
    return response;
  }
);
export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    clearErrors: (state, action) => {
      state.error = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(returnErrors.fulfilled, (state, action) => {
      state.error = {
        msg: action.payload.data.msg,
        status: action.payload.status,
        id: null,
      };
    });
  },
});
export const { clearErrors } = errorSlice.actions;
export default errorSlice.reducer;
