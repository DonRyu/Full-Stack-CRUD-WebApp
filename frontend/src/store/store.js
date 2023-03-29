/**
 * For combining reducers
 */
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";

const rootReducer = {
  products: productReducer,
};

// create the Redux store with the combined reducers
export const store = configureStore({
  reducer: rootReducer,
});
