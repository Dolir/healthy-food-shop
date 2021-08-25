import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../features/items/itemsSlice";
import reviewsReducer from "../features/reviews/reviewsSlice";
import authReducer from "../features/auth/authSlice";
import errorReducer from "../features/auth/errorSlice";
import cartReducer from "../features/cart/cartSlice";
import ordersReducer from "../features/orders/ordersSlice";
export const store = configureStore({
  reducer: {
    items: itemsReducer,
    reviews: reviewsReducer,
    error: errorReducer,
    auth: authReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});
