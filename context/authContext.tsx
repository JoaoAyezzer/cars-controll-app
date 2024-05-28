import React from "react";
import { useStorageState } from "@/hooks/useStorageState";

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
    // Implementar a regra para logar

    setSession("xxx"); // Replace "xxx" with the actual session token

    console.log(session);
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
