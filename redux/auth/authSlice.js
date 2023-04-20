import { createSlice } from "@reduxjs/toolkit";
import {
  authSignUpUser,
  authSignInUser,
  authSignOutUser,
  setAvatar,
} from "./authOperations";

const initialState = {
  name: null,
  email: null,
  token: null,
  isAuth: false,
  id: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(authSignUpUser.pending, (state) => {
        state.error = null;
      })
      .addCase(authSignUpUser.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.name = payload.name;
        state.email = payload.email;
        state.token = payload.token;
        state.id = payload.id;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(authSignUpUser.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(authSignInUser.pending, (state) => {
        state.error = null;
      })
      .addCase(authSignInUser.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.name = payload.name;
        state.email = payload.email;
        state.token = payload.token;
        state.id = payload.id;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(authSignInUser.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(authSignOutUser.pending, (state) => {
        state.error = null;
      })
      .addCase(authSignOutUser.fulfilled, (state) => {
        state.name = null;
        state.email = null;
        state.token = null;
        state.id = null;
        state.isAuth = false;
      })
      .addCase(authSignOutUser.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(setAvatar.pending, (state) => {
        state.error = null;
      })
      .addCase(setAvatar.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.name = payload.name;
        state.email = payload.email;
        state.token = payload.token;
        state.id = payload.id;
        state.avatar = payload.avatar;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(setAvatar.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },

  reducers: {
    refreshUser: (state, { payload }) => {
      console.log(payload);
      state.name = payload.name;
      state.email = payload.email;
      state.token = payload.token;
      state.id = payload.id;
      state.avatar = payload.avatar;
      state.error = null;
      state.isAuth = true;
    },
  },
});

export const { refreshUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
