import React, { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { Button } from "react-native-elements";
import { supabase } from "../core/lib/init-supabase";
import { AuthService } from "../core/services/auth-service";
import { styles } from "../theme/styles";

export default function RegisterScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authService = new AuthService(supabase);
  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
    setLoading(true);
    const { error, user } = await authService.registerAsync({
      email,
      password,
    });
    if (!error && !user) Alert.alert("Check your email for the login link!");
    if (error) Alert.alert(error.message);
    setLoading(false);
    navigation.navigate("login", {
      email: email,
    });
  };

  return (
    <View
      style={{
        padding: 15,
        paddingTop: 40,
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <Text style={styles.h1}>Register</Text>

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
          title="Register"
          buttonStyle={{
            borderRadius: 10,
            backgroundColor: "#0d9488",
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}
          titleStyle={{ color: "#ccfbf1" }}
          disabled={loading}
          loading={loading}
          onPress={() => onRegister()}
        />
      </View>
    </View>
  );
}
