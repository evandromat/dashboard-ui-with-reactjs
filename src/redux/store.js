import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../redux/features/auth/authSlice";
import categorySlice from "./features/category/categorySlice";
import productSlice from "./features/produtos/productSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categorySlice,
    product: productSlice,
  },
});
