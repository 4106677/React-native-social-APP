import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import db from "../firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import useRoute from "../Screens/router";
import { authStateChangeUser } from "../redux/auth/authOperations";

const auth = getAuth(db);

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
