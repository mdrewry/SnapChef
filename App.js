import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import ImagePicker from "./pages/ImagePicker";
import recipeListPage from "./pages/recipeListPage";
import cameraView from "./pages/CameraView";
import ErrorBoundary from "react-native-error-boundary";

const theme = {
  ...DefaultTheme,
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <Stack.Navigator initialRouteName="imagePicker">
            <Stack.Screen
              name="imagePicker"
              component={ImagePicker}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="cameraView"
              component={cameraView}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="listPage"
              component={recipeListPage}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </ErrorBoundary>
  );
}
