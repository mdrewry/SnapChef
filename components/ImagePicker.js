import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

const styles = StyleSheet.create({
  containerButtons: {
    marginTop: "5%",
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  container: {
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonWrapper: {
    width: "40%",
  },
});

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  useEffect(() => {
    getPermissionAsync();
  }, []);
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
  );
}
