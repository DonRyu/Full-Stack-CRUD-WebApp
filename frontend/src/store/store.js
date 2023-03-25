import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@app/store/slices';

export const store = configureStore({
  reducer: rootReducer,
});


