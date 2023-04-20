import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import Out from "../../assets/images/log-out.svg";
import Shape from "../../assets/images/shape.svg";
import ShapeRed from "../../assets/images/shape-red.svg";
import MapPin from "../../assets/images/mapPin.svg";

import { FlatList } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

import { useSelector } from "react-redux";
import app from "../../firebase/config";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  query,
} from "firebase/firestore";

const db = getFirestore(app);

export default function DefaultScreenPosts({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  const [commentsCount, setCommentsCount] = useState({});
  console.log(commentsCount);
  console.log(posts);

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(authSignOutUser());
  };

  const { userName, userEmail } = useSelector((state) => state.auth);

  const getAllPost = async () => {
    try {
      await onSnapshot(collection(db, "posts"), (snapshots) => {
        setPosts(snapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    } catch (error) {
      console.log(error.massage);
      Alert.alert("Try again");
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
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
      setCommentsCount((prev) => ({ ...prev, [postId]: 0 }));
    }
  };

  console.log(posts);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Публікації</Text>
        <TouchableOpacity style={styles.nav} onPress={logOut}>
          <Out />
        </TouchableOpacity>
      </View>
      <View style={styles.usersPosts}>
        <View style={styles.user}>
          <Image
            source={require("../../assets/images/avatar.png")}
            style={styles.avatar}
          ></Image>
          <View style={styles.description}>
            <Text
              style={{
                fontSize: 13,
                lineHeight: 15,
                fontWeight: 700,
                color: "#212121",
              }}
            >
              {userName}
            </Text>
            <Text style={styles.text}>{userEmail}</Text>
          </View>
        </View>
        <View style={styles.postsContainer}>
          <FlatList
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.postItem}>
                <Image source={{ uri: item.photo }} style={styles.postImage} />
                <Text style={styles.itemName}>{item.comment}</Text>
                <View style={styles.itemDetails}>
                  {commentsCount[item.id] >= 1 ? <ShapeRed /> : <Shape />}
                  <Text
                    style={{ color: "#BDBDBD", marginLeft: 9 }}
                    onPress={() =>
                      navigation.navigate("CommentsScreen", {
                        postId: item.id,
                        photo: item.photo,
                      })
                    }
                  >
                    {commentsCount[item.id] || 0}
                  </Text>
                  <MapPin style={{ marginLeft: "auto", marginRight: 4 }} />
                  <Text
                    style={styles.locationName}
                    onPress={() => navigation.navigate("MapScreen", { item })}
                  >
                    {item.location}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
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
    right: 20,
  },
  sectionTitle: {
    fontSize: 17,
  },
  usersPosts: {
    marginHorizontal: 16,
    margin: 32,
    // flex: 1,
    // flexDirection: "column",
    // paddingBottom: 40,
  },
  user: {
    // position: "absolute",
    flexDirection: "row",
    paddingBottom: 32,
  },
  description: {
    // flex: 1,
    marginLeft: 8,
    justifyContent: "center",
  },
  text: {
    fontSize: 11,
    lineHeight: 13,
    // fontWeight: 400,
    color: "#212121",
    opacity: 0.8,
  },
  avatar: {
    height: 60,
    width: 60,
    resizeMode: "contain",
  },
  postsContainer: {
    // height: "100%",
    marginBottom: 175,
  },
  postImage: {
    width: "100%",
    height: 240,
    paddingTop: 10,
    overflow: "hidden",
    borderRadius: 8,
  },
  postItem: {
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 32,
  },
  itemName: {
    marginTop: 8,
  },
  itemDetails: {
    marginTop: 11,
    flexDirection: "row",
    alignItems: "center",
  },
  locationName: {
    // marginLeft: 4,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
});
