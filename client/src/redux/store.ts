import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./reducers/filterReducer";

export const store = configureStore({
  reducer: {
    filterSlice: filterReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
