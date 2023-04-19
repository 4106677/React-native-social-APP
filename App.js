import { StyleSheet, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import useRoute from "./Screens/router";
import { StatusBar } from "expo-status-bar";

const MainStack = createStackNavigator();

export default function App() {
  const routing = useRoute(false);
  return (
    <View style={styles.container}>
      <NavigationContainer>{routing}</NavigationContainer>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
