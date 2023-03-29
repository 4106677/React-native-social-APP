import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Svg, SvgUri } from "react-native-svg";
import Grid from "../assets/images/grid.svg";
import GridFocus from "../assets/images/gridFocus.svg";
import Union from "../assets/images/union.svg";
import UnionFocus from "../assets/images/unionFocus.svg";
import User from "../assets/images/user.svg";
import UserFocus from "../assets/images/userFocus.svg";

import PostsScreen from "./PostsScreen";
import CreatePostScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const MainTab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <MainTab.Navigator
      screenOptions={{ tabBarShowLabel: false }}
      initialRouteName="Posts"
    >
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <View
                style={{
                  width: 70,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: focused ? "#FF6C00" : "#ffffff",
                }}
              >
                {focused ? <GridFocus /> : <Grid />}
              </View>
            );
          },
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <View
                style={{
                  width: 70,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: focused ? "#FF6C00" : "#ffffff",
                }}
              >
                {/* <Image source={require("../assets/images/new.png")} /> */}
                {focused ? <UnionFocus /> : <Union />}
              </View>
            );
          },
        }}
        name="CreatePosts"
        component={CreatePostScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <View
                style={{
                  width: 70,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: focused ? "#FF6C00" : "#ffffff",
                }}
              >
                {/* <Image source={require("../assets/images/user.png")} />
                 */}
                {focused ? <UserFocus /> : <User />}
              </View>
            );
          },
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
