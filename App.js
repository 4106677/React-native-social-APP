import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./Screens/auth/LoginScreen";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import Home from "./Screens/Home";

// import * as Font from "expo-font";
const MainStack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
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
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
        </MainStack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </View>
  );
}

// const loadApp = async () => {
//   await Font.loadAsync({});
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
