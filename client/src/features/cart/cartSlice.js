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
// export const getCartItems = createAsyncThunk(
//   "cart/getCartItems",
//   async (userID) => {
//     const response = await axios.get(`/api/auth/cart?userID=${userID}`);
//     return response.data;
//   }
// );
export const clearCartItem = createAsyncThunk(
  "cart/clearCartItem",
  async (item) => {
    if (item.userID) {
      await axios.delete(
        `/api/auth/cart?itemID=${item.itemID}&userID=${item.userID}`
      );
    }
    return item.itemID;
  }
);
export const clearCart = createAsyncThunk("cart/clearCart", async (userID) => {
  if (userID) {
    await axios.delete(`/api/auth/cartAll?userID=${userID}`);
  }

  return;
});
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (item) => {
    console.log(item);
    if (item.userID) {
      await axios.put(
        `/api/auth/cart?itemID=${item.itemID}&userID=${item.userID}&quantity=${item.quantity}`
      );
    }
    return item;
  }
);
// export const getCartItemsCount = createAsyncThunk(
//   "cart/getCartItemsCount",
//   async (options) => {
//     const filters = JSON.stringify(options.filters);
//     const response = await axios.get(`/api/items/count?filters=${filters}`);
//     return response.data;
//   }
// );
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
    // clearCart: (state, action) => {
    //   state.cartItems = [];
    //   localStorage.removeItem("cart");
    // },
    // updateCartItemQuantity: (state, action) => {
    //   const chosenIndex = state.cartItems.findIndex(
    //     (x) => x._id === action.payload.id
    //   );
    //   state.cartItems[chosenIndex].quantity = parseInt(action.payload.quantity);
    //   localStorage.removeItem("cart");
    //   localStorage.setObj("cart", state.cartItems);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCartItem.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        const found = state.cartItems.find((x) => x._id === action.payload._id);
        if (!found) {
          localStorage.setObj("cart", [...state.cartItems, action.payload]);
          state.cartItems.push(action.payload);
          state.isLoading = false;
        } else {
          const chosenIndex = state.cartItems.findIndex(
            (x) => x._id === action.payload._id
          );
          state.cartItems[chosenIndex].quantity += 1;
          localStorage.removeItem("cart");
          localStorage.setObj("cart", state.cartItems);
          state.isLoading = false;
        }
      })
      .addCase(clearCartItem.pending, (state, action) => {
        state.isLoading = true;
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
        state.isLoading = false;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cartItems = [];
        localStorage.removeItem("cart");
        state.isLoading = false;
      })
      // .addCase(getCartItems.pending, (state, action) => {
      //   state.isLoading = true;
      // })
      // .addCase(getCartItems.fulfilled, (state, action) => {
      //   state.cartItems = action.payload;
      //   localStorage.removeItem("cart");
      //   localStorage.setObj("cart", state.cartItems);
      //   state.isLoading = false;
      // })
      .addCase(updateCartItemQuantity.pending, (state, action) => {
        if (state.cartItems.length !== 0) {
          state.isLoading = false;
        } else {
          state.isLoading = true;
        }
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        if (state.cartItems.length !== 0) {
          const chosenIndex = state.cartItems.findIndex(
            (x) => x._id === action.payload.itemID
          );
          state.cartItems[chosenIndex].quantity = parseInt(
            action.payload.quantity
          );
          localStorage.removeItem("cart");
          localStorage.setObj("cart", state.cartItems);
        }
        state.isLoading = false;
      });
    //   .addCase(getCartItemsCount.fulfilled, (state, action) => {
    //     return { ...state, count: action.payload.count };
    //   });
  },
});

export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
