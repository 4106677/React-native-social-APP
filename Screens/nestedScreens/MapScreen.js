import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import Left from "../../assets/images/arrow-left.svg";

const MapScreen = ({ navigation, route }) => {
  const { latitude, longitude } = route.params.item.coordinates.coords;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.nav}
          onPress={() => {
            navigation.navigate("DefaultScreen");
          }}
        >
          <Left />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Карта</Text>
      </View>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        // minZoomLevel={15}
        // onMapReady={() => console.log("Map is ready")}
        // onRegionChange={() => console.log("Region change")}
      >
        <Marker
          title="I am here"
          coordinate={{ latitude, longitude }}
          // description="Hello"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
    height: "100%",
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
});

export default MapScreen;
