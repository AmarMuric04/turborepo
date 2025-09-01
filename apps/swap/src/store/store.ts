import { configureStore } from "@reduxjs/toolkit";
import { cctpSlice } from "./cctpSlice";

export const store = configureStore({
  reducer: {
    [cctpSlice.name]: cctpSlice.reducer,
  },
});
