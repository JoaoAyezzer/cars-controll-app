import React from "react";
import { useStorageState } from "@/hooks/useStorageState";
import { AuthService } from "@/services/auth";
import { router } from "expo-router";

const AuthContext = React.createContext<{
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren<{}>) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const signIn = (username: string, password: string) => {
    AuthService.signIn(username, password)
      .then((res) => {
        setSession(res.data.token);
        router.replace("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: signIn,
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
