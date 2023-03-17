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
} from "react-native";

export default function LoginScreen() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const nameHandler = (text) => setName(text);
  const passwordHandler = (text) => setPassword(text);

  const onLogin = () => {
    Alert.alert("Credentials", `${name} + ${password}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <Text style={styles.text}>Увійти</Text>
          <View style={styles.form}>
            <TextInput
              value={name}
              onChangeText={nameHandler}
              placeholder="Адреса електронної пошти"
              style={styles.input}
            />
            <TextInput
              value={password}
              onChangeText={passwordHandler}
              placeholder="Пароль"
              secureTextEntry={true}
              style={styles.input}
            />
            {/* <Button title={"Login"} style={styles.button} onPress={onLogin} /> */}
            <TouchableOpacity
              style={styles.button}
              onPress={onLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.btnText}>Увійти</Text>
            </TouchableOpacity>
            <Text style={styles.upperText}>
              Немає аккаунта? Зареєструватись.
            </Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 323,

    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  text: {
    textAlign: "center",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    margin: 32,
  },
  input: {
    minWidth: "100%",
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
  button: {
    marginTop: 27,
    width: 343,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    minWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  btnText: {
    color: "#fff",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
  },
  form: {
    marginHorizontal: 16,
  },
  upperText: {
    textAlign: "center",
    color: "#1B4371",
    marginTop: 16,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
  },
});
