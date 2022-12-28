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
  allProducts: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAllProduct: (state, { payload }) => {
      state.allProducts = payload;
    },
    hideFilter: (state) => {
      state.filterShown = !state.filterShown;
    },
    addToCart: (state, { payload }) => {
      const { id, navigate, qty, newPrice } = payload;
      const addedProduct = state.allProducts.find(
        (product) => product.productId === id
      );
      const itemTotal = qty * newPrice;
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
      const r = (state.cartItems = state.cartItems.filter(
        // (item) => state.cartItems.indexOf(item) !== id
        (item) => {
          const res = parseInt(item.productId) !== parseInt(id);
          return res;
        }
      ));

      console.log(r);
      state.cartItems = r;
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
export const {
  hideFilter,
  addToCart,
  updateQty,
  removeItem,
  getTotalAmount,
  setAllProduct,
} = productSlice.actions;
export default productSlice.reducer;
