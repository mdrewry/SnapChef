import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "./pages/LandingPage";
import RecipePage from "./pages/RecipePage";
import CameraView from "./pages/CameraView";
import ErrorBoundary from "react-native-error-boundary";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="landingPage">
          <Stack.Screen
            name="landingPage"
            component={LandingPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="cameraView"
            component={CameraView}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="recipePage"
            component={RecipePage}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
}
