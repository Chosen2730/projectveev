import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  filterShown: true,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    hideFilter: (state) => {
      state.filterShown = !state.filterShown;
    },
  },
  extraReducers: {},
});
export const { hideFilter } = productSlice.actions;
export default productSlice.reducer;
