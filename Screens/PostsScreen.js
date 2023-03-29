import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Out from "../assets/images/log-out.svg";

export default function PostsScreen() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Публікації</Text>
        <TouchableOpacity style={styles.container}>
          <Out />
        </TouchableOpacity>
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
  container: {
    position: "absolute",
    top: 10,
    right: 20,
  },
  sectionTitle: {
    fontSize: 17,
  },
});
