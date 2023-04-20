import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { store } from "./redux/store";

import { Main } from "./components/main";

const MainStack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Main />
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
