import { SessionProvider, useSession } from "@/context/authContext";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Slot } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function Root() {
  const { session, isLoading } = useSession();
  const colorScheme = useColorScheme();
  useEffect(() => {
    console.log("layout principal", session);
  }, [session]);
  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SessionProvider>
          <Slot />
        </SessionProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}
