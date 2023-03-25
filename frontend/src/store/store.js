import { configureStore } from '@reduxjs/toolkit';
import  productReducer from './productSlice'

const rootReducer =  {
  products: productReducer,
};


export const store = configureStore({
  reducer: rootReducer
});


