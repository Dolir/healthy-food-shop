import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../features/items/itemsSlice";
import reviewsReducer from "../features/reviews/reviewsSlice";
export const store = configureStore({
  reducer: {
    items: itemsReducer,
    reviews: reviewsReducer,
  },
});
