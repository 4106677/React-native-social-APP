import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import useRoute from "./Screens/router";
import { StatusBar } from "expo-status-bar";
import { store } from "./redux/store";
import { useState } from "react";

const MainStack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setUser(uid);
    } else {
    }
  });

  const routing = useRoute(user);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>{routing}</NavigationContainer>
        <StatusBar barStyle="light-content" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
