import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Out from "../assets/images/log-out.svg";

export default function PostsScreen() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Публікації</Text>
        <TouchableOpacity style={styles.nav}>
          <Out />
        </TouchableOpacity>
      </View>
      <View style={styles.users}>
        <View style={styles.user}>
          <Image
            source={require("../assets/images/avatar.png")}
            // height={60}
            // width={60}
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
  users: {
    marginHorizontal: 16,
    margin: 32,
    // flex: 1,
  },
  user: {
    position: "absolute",
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
    fontWeight: 400,
    color: "#212121",
    opacity: 0.8,
  },
});
