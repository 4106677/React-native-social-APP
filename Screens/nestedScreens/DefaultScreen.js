import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import Out from "../../assets/images/log-out.svg";
import Shape from "../../assets/images/shape.svg";
import MapPin from "../../assets/images/mapPin.svg";

import { FlatList } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";

export default function DefaultScreenPosts({ navigation, route }) {
  const [posts, setPosts] = useState([]);

  const logOut = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  // console.log(posts);

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
              Natali Romanova
            </Text>
            <Text style={styles.text}>email@example.com</Text>
          </View>
        </View>
        <View style={styles.postsContainer}>
          <FlatList
            data={posts}
            keyExtractor={(item, index) => {
              return item.photo;
            }}
            renderItem={({ item }) => (
              <View style={styles.postItem}>
                <Image source={{ uri: item.photo }} style={styles.postImage} />
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.itemDetails}>
                  <Shape />
                  <Text
                    style={{ color: "#BDBDBD", marginLeft: 9 }}
                    onPress={() => navigation.navigate("CommentsScreen")}
                  >
                    0
                  </Text>
                  <MapPin style={{ marginLeft: "auto", marginRight: 4 }} />
                  <Text
                    style={{ textDecorationLine: "underline" }}
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
  },
  user: {
    // position: "absolute",
    flexDirection: "row",
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
    height: "100%",
  },
  postImage: {
    width: "100%",
    height: 240,
    paddingTop: 10,
    overflow: "hidden",
    borderRadius: 8,
    marginTop: 32,
  },
  postItem: {
    fontSize: 16,
    lineHeight: 19,
  },
  itemName: {
    marginTop: 8,
  },
  itemDetails: {
    marginTop: 11,
    flexDirection: "row",
    alignItems: "center",
  },
});
