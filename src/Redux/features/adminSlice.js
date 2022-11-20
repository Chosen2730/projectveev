import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { featured, trending } from "../../Utils/products";

export const allProducts = [...featured, ...trending];

const initialState = {
  selectedHeaderIndex: 0,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setSelectedHeaderIndex: (state, { payload }) => {
      state.selectedHeaderIndex = payload;
    },
  },
  extraReducers: {},
});
export const { setSelectedHeaderIndex } = adminSlice.actions;
export default adminSlice.reducer;
