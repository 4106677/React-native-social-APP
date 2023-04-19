import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Button,
  Text,
  TouchableOpacity,
  ImageBackground,
  onChangeText,
  Image,
} from "react-native";
import Add from "../../assets/images/add.svg";
import Out from "../../assets/images/log-out.svg";

export default function ProfileScreen({ navigation }) {
  const logOut = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require("../../assets/images/photoBG.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.container}>
          <View style={styles.form}>
            <View style={styles.user}>
              <Image
                source={require("../../assets/images/avatar.png")}
                style={styles.avatar}
              ></Image>
              <Add style={styles.add} />
            </View>
            <Out style={styles.out} onPress={logOut} />
            <Text style={styles.text}>Natali Romanova</Text>

            <View></View>
          </View>

          {/* <Text style={styles.upperText}>Немає аккаунта? Зареєструватись.</Text> */}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-start",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    // flex: 0.7,
    // justifyContent: "center",
  },
  text: {
    textAlign: "center",
    // fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 32,
    marginTop: 92,
  },

  form: {
    // marginHorizontal: 16,
    // alignItems: "center",
  },
  user: {
    alignSelf: "center",
    // position: "absolute",
    width: 120,
    margin: 0,
    padding: 0,
  },
  avatar: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
    // left: 50%,
  },
  add: {
    position: "absolute",
    alignSelf: "flex-end",
    // left: 50%,
    // marginLeft: 330,
    right: -18.5,
    top: 16,
  },
  out: {
    position: "absolute",
    alignSelf: "flex-end",
    top: 24,
  },
});
