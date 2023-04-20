import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./auth/RegistrationScreen";
import LoginScreen from "./auth/LoginScreen";
import Home from "./Home";
// import MapScreen from "./MapScreen";

const MainStack = createStackNavigator();

export default function useRoute(isAuth) {
  if (!isAuth) {
    return (
      <MainStack.Navigator initialRouteName="RegistrationScreen">
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      </MainStack.Navigator>
    );
  } else {
    return (
      <MainStack.Navigator>
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
      </MainStack.Navigator>
    );
  }
}
