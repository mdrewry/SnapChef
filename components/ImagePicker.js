import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Icon from "../res/SnapChefIcon.png";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffc00",
    alignItems: "center",
    justifyContent: "space-around",
    width:"100%"
  },
  containerButtons: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300
  },
  containerInner: {
    width: "100%",
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
      <Image style={styles.image} source={Icon}/>
      <View style={styles.containerInner}>
        <View style={styles.containerButtons}>
          <View style={styles.buttonWrapper}>
            <Button mode="outlined" color="#FFFFFF" onPress={pickImage} >Gallery</Button>
          </View>
          <Text>or</Text>
          <View style={styles.buttonWrapper}>
            <Button mode="outlined" color="#FFFFFF" onPress={takePhoto} >Camera</Button>
          </View>
        </View>
      </View>
    </View>
  );
}
