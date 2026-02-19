import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { api } from "../services/api";

interface DecodedUser {
  id: string;      // align to backend (string UUID or stringified id)
  email: string;
  name: string;
}

export interface AuthContextType {
  user: DecodedUser | null;
  setUser: (u: DecodedUser | null) => void;
  // loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DecodedUser | null>(null);
 // const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   (async () => {
//     try {
//       const token = Cookies.get("token");
//       if (!token) return setLoading(false);

//       const { userId } = jwtDecode<{ userId: string }>(token);
//       console.log("Decoded userId from token:", userId); // Debugging line to check decoded userId
//       // fetch full user info from backend
//       const res = await api.get(`/api/auth/${userId}`, { withCredentials: true });
//       console.log("User data from backend:", res.data); // Debugging line to check user data from backend
//       setUser(res.data);
//     } catch (e) {
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   })();
// }, []);

  return (
    <AuthContext.Provider value={{ user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};