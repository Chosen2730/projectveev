import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../../Utils/functions";
import { featured, trending } from "../../Utils/products";

export const arr = [...featured, ...trending];

// export const arr = async () => await getAllProducts(20)

const initialState = {
  filterShown: true,
  qty: 1,
  cartItems: [],
  totalAmount: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    hideFilter: (state) => {
      state.filterShown = !state.filterShown;
    },
    addToCart: (state, { payload }) => {
      const { productId, navigate, qty } = payload;
      const addedProduct = arr[productId];
      const itemTotal = qty * addedProduct.price;
      const cartProduct = { ...addedProduct, qty, itemTotal };
      state.qty = 1;
      state.cartItems.push(cartProduct);
      navigate("/cart");
    },
    updateQty: (state, { payload }) => {
      const { action, qty } = payload;
      if (action === "INC") {
        state.qty = qty + 1;
      } else if (action === "DEC") {
        state.qty = qty - 1;
      }
    },
    removeItem: (state, { payload }) => {
      const { id } = payload;
      state.cartItems = state.cartItems = state.cartItems.filter(
        (item) => state.cartItems.indexOf(item) !== id
      );
    },
    getTotalAmount: (state) => {
      let total = state.cartItems.reduce((acc, crr) => {
        acc += crr.itemTotal;
        return acc;
      }, 0);
      state.totalAmount = total;
    },
  },
  extraReducers: {},
});
export const { hideFilter, addToCart, updateQty, removeItem, getTotalAmount } =
  productSlice.actions;
export default productSlice.reducer;
