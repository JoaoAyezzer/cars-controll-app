import { useSession } from "@/context/authContext";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native-paper";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  useEffect(() => {
    console.log("Layout", session);
  }, [session]);

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    console.log(session);

    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}