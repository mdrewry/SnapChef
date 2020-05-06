import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  containerButtons: {
    marginTop: "5%",
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  containerInner: {
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonWrapper: {
    width: "40%",
  },
});

export default function ImagePickerExample({ navigation }) {
  const [image, setImage] = useState(null);
  useEffect(() => {
    getPermissionAsync();
  }, []);
  if (image) {
    navigation.navigate("listPage");
  }
  async function getPermissionAsync() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }
  async function pickImage() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  }
  async function takePhoto() {}
  return (
    <View style={styles.container}>
      <Text>Welcome to SnapChef</Text>
      <View style={styles.containerInner}>
        <Text>Import image from</Text>
        <View style={styles.containerButtons}>
          <View style={styles.buttonWrapper}>
            <Button title="Gallery" onPress={pickImage} />
          </View>
          <Text>or</Text>
          <View style={styles.buttonWrapper}>
            <Button title="Camera" onPress={takePhoto} />
          </View>
        </View>
      </View>
    </View>
  );
}
