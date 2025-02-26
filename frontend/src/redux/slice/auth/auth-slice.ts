// authentication state

import { createSlice } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  token: string | null;
}

export interface LoginPayload {
  user: User;
  token: string;
}

const initialState = {
  user: "",
  isLoggedIn: false,
  token: "",
  pageTitle: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginState: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.token = action.payload.token;

      // set token to the storage
      localStorage?.setItem("financial-auth-token", action.payload.token);
    },
    logout: (state) => {
      localStorage.removeItem("financial-auth-token");
      state.user = "";
      state.isLoggedIn = false;
      state.token = "";
    },
    updateUser: (state, action) => {
      state.user = action.payload.user;
    },

    updatePageTitle: (state, action) => {
      state.pageTitle = action.payload;
    },
  },
});

export const { loginState, logout, updateUser, updatePageTitle } =
  authSlice.actions;

export default authSlice.reducer;
