import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import app from "../../firebase/config";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

import { AntDesign } from "@expo/vector-icons";

const db = getFirestore(app);

const CommentsScreen = ({ route, navigation }) => {
  const { postId, photo } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [focus, setFocus] = useState(false);

  const { userName } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    navigation.setParams({ commentsCount: commentsCount });
  }, [commentsCount]);

  const createPost = async () => {
    if (comment.trim() === "") {
      Alert.alert("Напиши вже що-небудь");
      return;
    }
    const docRef = await doc(db, "posts", postId);

    await addDoc(collection(docRef, "comments"), {
      comment,
      userName,
      postDate: new Date(),
    });
    setComment("");
  };

  const getAllPosts = async () => {
    try {
      const docRef = await doc(db, "posts", postId);

      onSnapshot(collection(docRef, "comments"), (data) =>
        setAllComments(
          data.docs.map((doc) => ({
            ...doc.data(),
          }))
        )
      );

      setCommentsCount(Number(allComments.length));
    } catch (error) {
      console.log(error);
    }
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const onFocus = () => {
    setIsShowKeyboard(true);
    setFocus(true);
  };

  const onBlur = () => {
    setIsShowKeyboard(false);
    setFocus(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.postWrapper}>
          <Image source={{ uri: photo }} style={styles.post} />
          {/* <Text>{allComments.length}</Text> */}
          <SafeAreaView style={styles.wrapper}>
            <FlatList
              data={allComments}
              renderItem={({ item }) => (
                <View style={styles.commentContainer}>
                  <Image
                    source={require("../../assets/images/avatar.png")}
                    style={styles.avatar}
                  ></Image>
                  <Text style={styles.comment}>{item.comment}</Text>
                  {/* <Text>{item.postDate}</Text> */}
                </View>
              )}
              keyExtractor={(item, index) => item.id}
            />
          </SafeAreaView>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View
            style={{
              bottom: isShowKeyboard ? 180 : 16,
            }}
            onFocus={onFocus}
            onBlur={onBlur}
          >
            <TextInput
              placeholderTextColor={"#BDBDBD"}
              placeholder="Коментувати..."
              style={styles.input}
              value={comment}
              onChangeText={(value) => setComment(value)}
            ></TextInput>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={createPost}
            >
              <AntDesign name="arrowup" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  wrapper: {
    height: 280,
  },
  commentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  comment: {
    padding: 16,
    marginBottom: 24,
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderColor: "rgba(0, 0, 0, 0.03)",
    borderWidth: 1,
    width: "100%",
    marginLeft: 16,
  },
  post: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    marginBottom: 32,
    marginTop: 32,
  },
  input: {
    marginBottom: 16,
    padding: 16,
    height: 50,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 18,
    color: "#212121",
    backgroundColor: "#F6F6F6",

    // boxSizing: "border-box",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  userName: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 13,
    lineHeight: 18,
    color: "#BDBDBD",
  },
  button: {
    position: "absolute",
    // left: "84%",
    // top: "85.5%",
    right: -16,
    bottom: -6,
    marginHorizontal: 25,
    marginTop: 32,
    marginBottom: 30,
    backgroundColor: "#FF6C00",
    height: 35,
    width: 35,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    overflow: "hidden",
    borderRadius: 20,
  },
});
