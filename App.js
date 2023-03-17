import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import LoginScreen from "./Screens/LoginScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/images/photoBG.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <LoginScreen />
      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
});
