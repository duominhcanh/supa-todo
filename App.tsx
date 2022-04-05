import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Platform } from "react-native";
import { colors, ThemeProvider } from "react-native-elements";
import { AuthContextProvider } from "./src/components/auth.context";
import LoginScreen from "./src/screens/login.screen";
import MainScreen from "./src/screens/main.screen";
import RegisterScreen from "./src/screens/register.screen";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);

const theme = {
  colors: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="register" component={RegisterScreen} />
            <Stack.Screen name="main" component={MainScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
