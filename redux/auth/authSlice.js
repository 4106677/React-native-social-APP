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
      .addCase(authSignUpUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.id = action.payload.id;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(authSignUpUser.rejected, (state, action) => {
        state.error = action.payload;
      });
    builder
      .addCase(authSignInUser.pending, (state) => {
        state.error = null;
      })
      .addCase(authSignInUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.id = action.payload.id;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(authSignInUser.rejected, (state, action) => {
        state.error = action.payload;
      });
    builder
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
      .addCase(authSignOutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
    builder
      .addCase(setAvatar.pending, (state) => {
        state.error = null;
      })
      .addCase(setAvatar.fulfilled, (state, action) => {
        console.log(action.payload);
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.id = action.payload.id;
        state.avatar = action.payload.avatar;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(setAvatar.rejected, (state, action) => {
        state.error = action.payload;
      });
  },

  reducers: {
    refreshUser: (state, action) => {
      console.log(action.payload);
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.avatar = action.payload.avatar;
      state.error = null;
      state.isAuth = true;
    },
  },
});

export const { refreshUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
