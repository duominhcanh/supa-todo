import React, { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { Button } from "react-native-elements";
import { supabase } from "../core/lib/init-supabase";
import { AuthService } from "../core/services/auth-service";
import { styles } from "../theme/styles";

export default function LoginScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const params = route.params;

  const [email, setEmail] = useState(
    params ? params.email : "duominhcanh@gmail.com"
  );
  const [password, setPassword] = useState("123456");
  const authService = new AuthService(supabase);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    const { error, user } = await authService.loginAsync({ email, password });
    if (error) Alert.alert(error.message);
    setLoading(false);
    navigation.navigate("main");
  };

  return (
    <View style={styles.screenRoot}>
      <Text style={styles.h1}>Login</Text>

      <Text style={{ ...styles.label, marginTop: 40 }}>Email</Text>
      <TextInput
        style={styles.textbox}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="email@address.com"
        autoCapitalize={"none"}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.textbox}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize={"none"}
      />
      <View
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "baseline",
          marginTop: 30,
        }}
      >
        <Button
          title="Login"
          buttonStyle={{
            borderRadius: 10,
            backgroundColor: "#0d9488",
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}
          titleStyle={{ color: "#ccfbf1" }}
          disabled={loading}
          loading={loading}
          onPress={() => onLogin()}
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
          title="I want a new account"
          buttonStyle={{
            backgroundColor: "transparent",
            paddingVertical: 10,
            padding: 0,
          }}
          titleStyle={{ color: "#0284c7", fontWeight: "600" }}
          onPress={() => {
            navigation.navigate("register");
          }}
        />
      </View>
    </View>
  );
}
