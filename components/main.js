import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useRoute from "../Screens/router";
import { useDispatch, useSelector } from "react-redux";

export const Main = () => {
  const [user, setUser] = useState(null);
  const state = useSelector((state) => state);
  const dispatch = useDispatch;
  console.log(state);

  const auth = getAuth();
  const routing = useRoute(user);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;

      setUser(uid);
    } else {
    }
  });

  useEffect(() => {}, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
