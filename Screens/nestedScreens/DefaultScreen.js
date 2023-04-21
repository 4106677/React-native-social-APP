import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import Out from "../../assets/images/log-out.svg";
import Shape from "../../assets/images/shape.svg";
import ShapeRed from "../../assets/images/shape-red.svg";
import MapPin from "../../assets/images/mapPin.svg";

import { FlatList } from "react-native-gesture-handler";

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
import postsSelectors from "../../redux/posts/postsSelectors";
import authSelectors from "../../redux/auth/authSelectors";
import postOperation from "../../redux/posts/postsOperations";

const db = getFirestore(app);

export default function DefaultScreenPosts({ navigation, route }) {
  const posts = useSelector(postsSelectors.getPosts);
  const user = useSelector(authSelectors.getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postOperation.getAllPosts());
  }, []);

  // const [posts, setPosts] = useState([]);
  // const [commentsCount, setCommentsCount] = useState({});
  // const { userName, userEmail } = useSelector((state) => state.auth);

  // console.log(posts);
  const logOut = () => {
    dispatch(authSignOutUser());
  };

  // const getAllPost = async () => {
  //   try {
  //     onSnapshot(collection(db, "posts"), (data) => {
  //       setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     });
  //   } catch (error) {
  //     console.log(error.massage);
  //     Alert.alert("Try again");
  //   }
  // };

  // useEffect(() => {
  //   if (route.params?.commentsCount) {
  //     setCommentsCount((prev) => ({
  //       ...prev,
  //       [route.params.postId]: route.params.commentsCount,
  //     }));
  //   }
  // }, [route]);

  // useEffect(() => {
  //   getAllPost();
  //   posts.forEach((post) => {
  //     getCommentsCount(post.id);
  //     console.log(post.id);
  //   });
  // }, []);

  // const getCommentsCount = async (postId) => {
  //   try {
  //     const commentsRef = collection(db, `posts/${postId}/comments`);
  //     const queryRef = query(commentsRef);
  //     const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
  //       const commentsCount = querySnapshot.docs.length;
  //       setCommentsCount((prev) => ({ ...prev, [postId]: commentsCount }));
  //     });
  //     return () => unsubscribe();
  //   } catch (error) {
  //     console.log(error);
  //     setCommentsCount((prev) => ({ ...prev, [postId]: 0 }));
  //   }
  // };

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
              {user.userName}
            </Text>
            <Text style={styles.text}>{user.userEmail}</Text>
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
                  {/* <Shape /> */}
                  {item.countComments !== 0 ? <ShapeRed /> : <Shape />}
                  <Text
                    style={{ color: "#BDBDBD", marginLeft: 9 }}
                    onPress={() =>
                      navigation.navigate("CommentsScreen", {
                        postId: item.id,
                        photo: item.photo,
                      })
                    }
                  >
                    {item.countComments || 0}
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
    height: 540,
    // marginBottom: 175,
    // flexDirection: "row-reverse",
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
