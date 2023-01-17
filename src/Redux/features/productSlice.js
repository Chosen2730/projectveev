import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
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
  featuredProducts: [],
  trendingProducts: [],
  activeCategory: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAllProduct: (state, { payload }) => {
      state.allProducts = payload;
      const feat = payload.filter((product) => product.featured === "on");
      const trend = payload.filter((product) => product.trending === "on");
      state.featuredProducts = feat;
      state.trendingProducts = trend;
    },
    hideFilter: (state) => {
      state.filterShown = !state.filterShown;
    },
    addToCart: (state, { payload }) => {
      const { id, navigate, qty, newPrice, selectedSize } = payload;
      const addedProduct = state.allProducts.find(
        (product) => product.productId === id
      );
      const itemTotal = qty * newPrice;
      const cartProduct = { ...addedProduct, qty, itemTotal, selectedSize };
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
    getTotalAmount: (state) => {
      let total = state.cartItems.reduce((acc, crr) => {
        acc += crr.itemTotal;
        return acc;
      }, 0);
      state.totalAmount = total;
    },
    removeItem: (state, { payload }) => {
      const presentState = current(state);
      const newItems = presentState.cartItems.filter(
        (item) => item.productId !== payload
      );
      state.cartItems = newItems;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    setActiveCategory: (state, { payload }) => {
      state.activeCategory = payload;
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
  clearCart,
  setActiveCategory,
} = productSlice.actions;
export default productSlice.reducer;
