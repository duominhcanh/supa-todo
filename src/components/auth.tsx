import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, View, Text } from "react-native";
import { Styles } from "../core/lib/constants";
import { supabase } from "../core/lib/init-supabase";

import { Button, Input } from "react-native-elements";
import { AuthService } from "../core/services/auth-service";

export default function Auth() {
  const [email, setEmail] = useState("duominhcanh@gmail.com");
  const [password, setPassword] = useState("123456");
  const [currentAction, setCurrentAction] = useState("");
  const authService = new AuthService(supabase);

  const handleLogin = async (
    action: string,
    email: string,
    password: string
  ) => {
    setCurrentAction(action);
    const { error, user } =
      action === "LOGIN"
        ? await authService.loginAsync({ email, password })
        : await authService.registerAsync({ email, password });
    if (!error && !user) Alert.alert("Check your email for the login link!");
    if (error) Alert.alert(error.message);
    setCurrentAction("");
  };

  return (
    <View>
      <View style={[styles.verticallySpaced, { marginTop: 20 }]}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.textbox}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.textbox}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "baseline",
        }}
      >
        <Button
          title="Sign in"
          disabled={!!currentAction.length}
          loading={currentAction === "LOGIN"}
          onPress={() => handleLogin("LOGIN", email, password)}
        />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "baseline",
        }}
      >
        <Button
          title="Sign up"
          disabled={!!currentAction.length}
          loading={currentAction === "SIGNUP"}
          onPress={() => handleLogin("SIGNUP", email, password)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: Styles.spacing,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  textbox: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#e5e7eb",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
  },
  label: {
    fontSize: 15,
    marginTop: 10,
  },
});
