import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { featured, trending } from "../../Utils/products";

export const allProducts = [...featured, ...trending];

const initialState = {
  selectedHeaderIndex: 0,
  isProductModalShown: false,
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
  },
  extraReducers: {},
});
export const { setSelectedHeaderIndex, setProductModalShown } =
  adminSlice.actions;
export default adminSlice.reducer;
