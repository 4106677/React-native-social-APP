import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from "react-native";
import Left from "../assets/images/arrow-left.svg";
import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import DropPhoto from "../assets/images/dropPhoto.svg";
import MapPin from "../assets/images/mapPin.svg";
import Trash from "../assets/images/trash.svg";
import Cam from "../components/Camera";

export default function CreatePostsScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  const nameHandler = (text) => setName(text);
  const locationHandler = (text) => setLocation(text);

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.nav}>
            <Left />
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Створити публікацію</Text>
        </View>
        <View style={styles.container}>
          <View onPress={console.log("object")} style={styles.dropzone}>
            {hasPermission ? (
              <Camera style={styles.camera}>
                <TouchableOpacity style={styles.dropCamera} onPress={() => {}}>
                  <DropPhoto />
                </TouchableOpacity>
              </Camera>
            ) : (
              <TouchableOpacity
                style={styles.dropPhoto}
                onPress={() => {
                  Alert.alert(`Надайте права доступу для додатку "Камера"`);
                }}
              >
                <DropPhoto />
              </TouchableOpacity>
            )}
            {/* <DropPhoto style={styles.dropPhoto} /> */}

            {/* <Cam /> */}
          </View>
          <Text style={styles.uploadText}>Завантажте фото</Text>
          <View>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? 93 : 43,
                }}
              >
                <TextInput
                  value={name}
                  onChangeText={nameHandler}
                  placeholder="Назва..."
                  style={styles.input}
                />
                <View>
                  <TextInput
                    value={location}
                    onChangeText={locationHandler}
                    placeholder="Місцевість..."
                    style={{ ...styles.input, paddingLeft: 28 }}
                  />
                  <MapPin style={styles.mapPin} />
                </View>
              </View>
              <TouchableOpacity
                style={name.length < 1 ? styles.buttonOff : styles.button}
                // onPress={onLogin}
                activeOpacity={0.8}
              >
                <Text
                  style={
                    name.length < 1
                      ? { ...styles.btnText, color: "#BDBDBD" }
                      : styles.btnText
                  }
                >
                  Опублікувати
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bin}
                // onPress={onLogin}
                activeOpacity={0.8}
              >
                <Trash />
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
  },
  header: {
    width: "100%",
    height: 44,
    flexDirection: "row",
    marginTop: 44,
    paddingVertical: 11,
    justifyContent: "center",
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    borderBottomWidth: 1,
  },
  nav: {
    position: "absolute",
    top: 10,
    left: 20,
  },

  description: {
    // flex: 1,
    marginLeft: 8,
    justifyContent: "center",
  },
  uploadText: {
    fontSize: 16,
    lineHeight: 19,
    marginTop: 8,
    marginBottom: 32,
    color: "#BDBDBD",
    // opacity: 0.8,
  },
  container: {
    marginHorizontal: 16,
    margin: 32,
  },
  dropzone: {
    backgroundColor: "#F6F6F6",
    height: 240,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderWidth: 1,
  },
  camera: {
    height: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
  dropPhoto: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },
  dropCamera: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    opacity: 0.85,
  },
  input: {
    height: 50,
    padding: 10,
    paddingLeft: 0,
    borderWidth: 1,
    marginBottom: 16,

    borderColor: "transparent",
    borderBottomColor: "#E8E8E8",
    fontSize: 16,
  },
  mapPin: {
    position: "absolute",
    bottom: 29,
    // transform: [{ translateY: 12 }],
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
  buttonOff: {
    width: 343,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    minWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  btnText: {
    color: "#fff",
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
  },
  bin: {
    backgroundColor: "#F6F6F6",
    width: 70,

    marginTop: 120,
    borderRadius: 100,
    // minWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 40,
  },
  trash: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
});
