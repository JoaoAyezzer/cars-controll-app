import Colors from "@/constants/Colors";
import { useSession } from "@/context/authContext";
import React, { useState } from "react";
import { Image, View, useColorScheme } from "react-native";
import { Button, TextInput } from "react-native-paper";

const Login: React.FC = () => {
  const { session, isLoading, signIn } = useSession();
  const colorScheme = useColorScheme();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = () => {
    signIn(username, password);
  };
  const handleUsername = (text: string) => {
    setUsername(text);
  };
  const handlePassword = (text: string) => {
    setPassword(text);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <View style={{ width: "100%", alignItems: "center", marginBottom: 100 }}>
        <Image source={require("../assets/images/logo-example.png")} />
      </View>
      <TextInput
        label={"Login"}
        mode="outlined"
        onChangeText={handleUsername}
        right={<TextInput.Icon icon="account" />}
      />
      <TextInput
        style={{ marginTop: 20 }}
        label={"Senha"}
        mode="outlined"
        onChangeText={handlePassword}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        mode="contained"
        style={{ borderRadius: 10, marginTop: 20 }}
        textColor="#fff"
        onPress={handleSignIn}
        theme={{
          colors: {
            primary: Colors[colorScheme ?? "light"].tint,
          },
        }}
      >
        Entrar
      </Button>
      <Button
        mode="text"
        style={{ borderRadius: 10, marginTop: 10 }}
        textColor={Colors[colorScheme ?? "light"].text}
        theme={{
          colors: {
            primary: Colors[colorScheme ?? "light"].tint,
          },
        }}
      >
        Esqueci a senha
      </Button>
    </View>
  );
};

export default Login;
