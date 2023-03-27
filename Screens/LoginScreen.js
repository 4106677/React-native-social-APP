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
} from "react-native";

export default function LoginScreen() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [focus, setFocus] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const emailHandler = (text) => setemail(text);
  const passwordHandler = (text) => setPassword(text);

  const onLogin = () => {
    Alert.alert("Credentials", `${email} + ${password}`);
    Keyboard.dismiss();
    setIsShowKeyboard(false);
    setemail("");
    setPassword("");
    console.log(email, password);
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  // const [inputBacklight, setInputBacklight] = useState({
  //   borderColor: "#E8E8E8",
  // });

  const onFocus = () => {
    setIsShowKeyboard(true);
    setFocus(true);
  };

  const onBlur = () => {
    setIsShowKeyboard(false);
    setFocus(false);
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.wrapper}>
        <ImageBackground
          source={require("../assets/images/photoBG.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.container}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View
                // style={styles.form}
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? 93 : 43,
                }}
              >
                <Text style={styles.text}>Увійти</Text>
                <TextInput
                  value={email}
                  onChangeText={emailHandler}
                  placeholder="Адреса електронної пошти"
                  // style={{ ...styles.input, ...inputBacklight }}
                  // style={focus ? styles.inputOnFocus : styles.inputOnBlur}
                  style={styles.input}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  autoComplete="email"
                />
                <View>
                  <TextInput
                    value={password}
                    onChangeText={passwordHandler}
                    placeholder="Пароль"
                    secureTextEntry={hidePassword}
                    // style={focus ? styles.inputOnFocus : styles.inputOnBlur}
                    style={styles.input}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                  {password.length > 0 && (
                    <TouchableOpacity
                      style={styles.show}
                      onPress={toggleHidePassword}
                    >
                      <Text style={{ color: "#1B4371" }}>
                        {hidePassword ? "Show" : "Hide"}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
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
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    margin: 32,
  },

  show: {
    position: "absolute",
    right: 15,
    top: 30,
  },
  input: {
    height: 50,
    padding: 10,
    borderWidth: 1,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
  },

  button: {
    // marginTop: 27,
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
    // marginHorizontal: 16,
  },
  upperText: {
    textAlign: "center",
    color: "#1B4371",
    marginTop: 16,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 144,
  },
});
