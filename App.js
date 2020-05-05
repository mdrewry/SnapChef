import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ImagePicker from "./components/ImagePicker";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to SnapChef</Text>
      <ImagePicker />
    </View>
  );
}
