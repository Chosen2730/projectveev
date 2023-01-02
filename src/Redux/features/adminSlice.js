import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { featured, trending } from "../../Utils/products";

export const allProducts = [...featured, ...trending];

const initialState = {
  selectedHeaderIndex: 0,
  isProductModalShown: false,
  isProductEditModalShown: false,
  allProducts: [],
  allOrders: [],
  allUsers: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setSelectedHeaderIndex: (state, { payload }) => {
      state.selectedHeaderIndex = payload;
    },
    setProductModalShown: (state) => {
      state.isProductModalShown = !state.isProductModalShown;
    },
    setProductEditModalShown: (state) => {
      state.isProductEditModalShown = !state.isProductEditModalShown;
    },
    setUsers: (state, { payload }) => {
      state.allUsers = payload;
    },
    setOrders: (state, { payload }) => {
      state.allOrders = payload;
    },
    setProducts: (state, { payload }) => {
      state.allProducts = payload;
    },
  },
  extraReducers: {},
});
export const {
  setSelectedHeaderIndex,
  setProductModalShown,
  setProductEditModalShown,
  setOrders,
  setProducts,
  setUsers,
} = adminSlice.actions;
export default adminSlice.reducer;
