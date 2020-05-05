import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default function ImagePickerExample() {
    const [image,setImage] = useState(null);
    
    useEffect(()=>{getPermissionAsync();},[]);
    async function getPermissionAsync(){
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    };
    async function pickImage(){
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          setImage(result.uri)
        }
  
        console.log(result);
      } catch (E) {
        console.log(E);
      }
    };
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Hello Rohan LOL</Text>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }