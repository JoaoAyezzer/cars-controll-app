import { useSession } from "@/context/authContext";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

// import { Container } from './styles';

const Profile: React.FC = () => {
  const { signOut } = useSession();
  return (
    <View>
      <Button mode="contained" onPress={signOut}>
        Logout
      </Button>
    </View>
  );
};

export default Profile;
