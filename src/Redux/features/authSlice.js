import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../Firebase/config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const ADMIN_EMAIL = "patiencesimoniseoluwa@gmail.com";
const initialState = {
  isLoggedIn: false,
  token: "",
  user: {
    name: "",
    email: "",
    admin: false,
    img: "",
  },
};

export const login = createAsyncThunk(
  "auth/loginData",
  (arg, { rejectWithValue }) => {
    try {
      const res = signInWithPopup(auth, googleProvider);
      return res;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {};
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, { payload }) => {
      const user = payload.user;
      const newToken = user.stsTokenManager.accessToken;
      state.token = newToken;
      state.isLoggedIn = true;
      state.user = {
        name: user.displayName,
        email: user.email,
        img: user.photoURL,
      };
      if (state.user.email === ADMIN_EMAIL) {
        state.user.admin = true;
      }
    },
    [login.rejected]: (state) => {
      state.isLoggedIn = false;
    },
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;