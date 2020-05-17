import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";

export default function CameraView({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  async function takePhoto() {
    if (camera) {
      let photo = await camera.takePictureAsync();
      navigation.navigate("listPage", { image: photo });
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        ref={(ref) => {
          setCamera(ref);
        }}
        ratio={"16:9"}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
          }}
        ></View>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            alignItems: "center",
          }}
          onPress={() => {
            takePhoto();
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginBottom: 10,
              backgroundColor: "#FFFFFF",
            }}
          ></View>
        </TouchableOpacity>
      </Camera>
    </View>
  );
}
