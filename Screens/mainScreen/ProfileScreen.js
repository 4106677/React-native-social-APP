import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import Add from "../../assets/images/add.svg";
import Out from "../../assets/images/log-out.svg";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { useSelector } from "react-redux";

import MapPin from "../../assets/images/mapPin.svg";
import Shape from "../../assets/images/shape.svg";
import ShapeRed from "../../assets/images/shape-red.svg";

import app from "../../firebase/config";
import {
  getFirestore,
  collection,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";
import { FlatList } from "react-native";

const db = getFirestore(app);

export default function ProfileScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [commentsCount, setCommentsCount] = useState({});
  const { userId, userName, userEmail } = useSelector((state) => state.auth);

  const getAllPost = async () => {
    try {
      onSnapshot(collection(db, "posts"), (data) => {
        const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setPosts(posts);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPost();
    posts.forEach((post) => {
      getCommentsCount(post.id);
    });
  }, []);

  useEffect(() => {
    if (route.params?.commentsCount) {
      setCommentsCount((prev) => ({
        ...prev,
        [route.params.postId]: route.params.commentsCount,
      }));
    }
  }, [route.params]);

  const getCommentsCount = async (postId) => {
    try {
      const commentsRef = collection(db, `posts/${postId}/comments`);
      const queryRef = query(commentsRef);
      const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
        const commentsCount = querySnapshot.docs.length;
        setCommentsCount((prev) => ({ ...prev, [postId]: commentsCount }));
        // console.log("PostId", postId);
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
      setCommentsCount((prev) => ({ ...prev, [postId]: 0 }));
    }
  };

  useEffect(() => {
    getUserPosts();
    return () => getUserPosts();
  }, []);

  const getUserPosts = async () => {
    try {
      const userPostsRef = collection(db, "posts");
      const queryRef = query(userPostsRef, where("userId", "==", userId));
      const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
        const userPosts = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserPosts(userPosts);

        if (userPosts && userPosts.length > 0) {
          userPosts.forEach((post) => {
            getCommentsCount(post.id.toString());
          });
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(authSignOutUser());
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
            <Text style={styles.text}>{userName}</Text>

            <View style={styles.postsList}>
              <FlatList
                data={userPosts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View>
                    <Image source={{ uri: item.photo }} style={styles.post} />
                    <View>
                      <Text style={styles.title}>{item.comment}</Text>
                    </View>
                    <View style={styles.box}>
                      <View style={styles.commentWrapper}>
                        {commentsCount[item.id] >= 1 ? <ShapeRed /> : <Shape />}

                        <Text
                          style={styles.commentsCount}
                          onPress={() =>
                            navigation.navigate("CommentsScreen", {
                              postId: item.id,
                              photo: item.photo,
                            })
                          }
                        >
                          {commentsCount[item.id] || 0}
                        </Text>
                      </View>

                      <View style={styles.wrapperLocation}>
                        <MapPin />

                        <Text style={styles.locationName}>{item.location}</Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
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
  postsList: {
    // marginTop: 33,
    height: 480,
  },
  post: {
    height: 240,
    width: "100%",
    borderRadius: 8,
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,

    // borderColor: "red",
    // borderWidth: 1,
  },

  title: {
    marginTop: 8,
    marginBottom: 8,
    // fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  commentWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  commentsCount: {
    // ntFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginLeft: 9,

    // borderColor: "red",
    // borderWidth: 1,
  },
  wrapperLocation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    // fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  locationName: {
    marginLeft: 4,
    // fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
});
