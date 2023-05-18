import { configureStore } from "@reduxjs/toolkit";
import qlsvReducer from "./reducers/qlsvReducer";
import quanLySinhVienReducer from "./reducers/quanLySinhVienReducer";

export const store = configureStore({
  reducer: {
    quanLySinhVienReducer: quanLySinhVienReducer,
    qlsvReducer: qlsvReducer,
  },
});
