import React, { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface DecodedUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthContextType {
  user: DecodedUser | null;
  setUser: (u: DecodedUser | null) => void;

}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DecodedUser | null>(null);


  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const me = await api.get("/api/users/me", { withCredentials: true });
        if (isMounted) {
          setUser(me.data);
        }
      } catch (error) {
        if (isMounted) {
          console.log("No authenticated user found.", error);
          setUser(null);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};