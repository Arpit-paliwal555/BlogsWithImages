import type { AuthState, IUser } from "../interfaces/authTypes";
import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';



interface AuthContextType { user: any | null; setUser: (u: any|null)=>void; }

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{children:React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<any|null>(null);

  useEffect(() => {
    const token = Cookies.get('token'); // or use getCookie('token')
    if (!token) return;

    // Option A: If token is a JWT and contains user info, decode it
    
    const payload = jwtDecode(token);
    setUser(payload.user || payload);

    // Option B: Preferable: call backend to validate token and return user
//     AuthService.getProfile(/* optional: pass token if needed */)
//       .then((u) => setUser(u))
//       .catch(() => {
//         Cookies.remove('token'); // cleanup if invalid
//         setUser(null);
//       });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};