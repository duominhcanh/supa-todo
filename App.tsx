import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { colors, Text, ThemeProvider } from "react-native-elements";
import Auth from "./src/components/auth";
import List from "./src/components/todo-list";
import { UserContextProvider, useUser } from "./src/components/user-context";
import { Styles } from "./src/core/lib/constants";

const theme = {
  colors: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
};

const Container = () => {
  const { user } = useUser();

  return user ? <List /> : <Auth />;
};

export default function App() {
  return (
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          <View style={styles.verticallySpaced}>
            <Text h2>Todo List</Text>
          </View>
          <Container />
          <StatusBar style="auto" />
        </View>
      </ThemeProvider>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    padding: 15,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
});
