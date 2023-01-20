import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../Firebase/config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUser } from "../../Utils/functions";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const ADMINS = [
  "patiencesimoniseoluwa@gmail.com",
  "olaitantijesuni@gmail.com",
  "paulinnocent04@gmail.com",
  "cf.youvarsity@gmail.com",
  "veev.clothiers@gmail.com",
  "ogohprecious@gmail.com",
];

const initialState = {
  isLoggedIn: false,
  token: null,
  user: {
    name: "",
    email: "",
    admin: false,
    img: "",
  },
};

export const login = createAsyncThunk(
  "auth/loginData",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const fullName = res._tokenResponse.fullName;
      const firstName = res._tokenResponse.firstName;
      const lastName = res._tokenResponse.lastName;
      const date = new Date().toDateString();
      const data = {
        uid: res.user.uid,
        photoURL: res.user.photoURL,
        email: res.user.email,
        emailVerified: res.user.emailVerified,
        phoneNumber: res.user.phoneNumber,
        displayName: res.user.displayName,
        metadata: { _createdAt: date, _updatedAt: date },
        fullName,
        firstName,
        lastName,
        blocked: false,
      };
      await createUser(data);
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
      state.token = null;
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
        ...user,
        name: user.displayName,
        email: user.email,
        img: user.photoURL,
      };

      for (let i = 0; i < ADMINS.length; i++) {
        if (state.user.email === ADMINS[i]) {
          state.user.admin = true;
          return;
        } else {
          state.user.admin = false;
        }
      }
    },

    [login.rejected]: (state) => {
      state.isLoggedIn = false;
    },
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
