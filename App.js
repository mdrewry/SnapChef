import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImagePicker from "./ImagePicker"
import { registerRootComponent } from 'expo';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello Rohan LOL</Text>
      <ImagePicker/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
