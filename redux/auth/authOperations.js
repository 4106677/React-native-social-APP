import { createAsyncThunk } from "@reduxjs/toolkit";
import fireApp from "../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
// import uuid from "react-native-uuid";
import { Alert } from "react-native";

export const authSignInUser = createAsyncThunk(
  "auth/logIn",
  async (credentials, { rejectWithValue }) => {
    console.log(credentials);
    const auth = getAuth();
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      return {
        name: user.displayName,
        email: user.email,
        id: user.uid,
        token: user.accessToken,
        // avatar: user.photoURL,
      };
    } catch (error) {
      Alert.alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const authSignUpUser = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(
        auth,
        // credentials.login,
        credentials.email,
        credentials.password
      );
      Alert.alert("You have successfully created an account!");
      await updateProfile(auth.currentUser, {
        displayName: credentials.login,
        photoURL: credentials.avatar,
      });
      const updateUser = auth.currentUser;
      console.log(
        updateUser,
        updateUser.displayName,
        updateUser.email,
        updateUser.uid
      );
      return {
        name: updateUser.displayName,
        email: updateUser.email,
        id: updateUser.uid,
        token: updateUser.accessToken,
        avatar: updateUser.photoURL,
      };
    } catch (error) {
      if (`${error}`.includes("auth/email-already-in-use")) {
        Alert.alert("Oops, something went wrong, please try again");
      }
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const authSignOutUser = createAsyncThunk(
  "auth/logOut",
  async (_, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setAvatar = createAsyncThunk(
  "auth/setAvatar",
  async (uri, { rejectWithValue }) => {
    const auth = getAuth();
    try {
      const avatar = await uploadPhotoToStorage(uri);
      await updateProfile(auth.currentUser, { photoURL: avatar });
      const updateUser = auth.currentUser;
      return {
        name: updateUser.displayName,
        email: updateUser.email,
        id: updateUser.uuid,
        token: updateUser.accessToken,
        avatar: updateUser.photoURL,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
