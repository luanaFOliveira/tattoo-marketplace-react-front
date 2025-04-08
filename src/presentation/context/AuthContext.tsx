'use client';
import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/domain/entities/user";
import { toast } from "react-toastify";

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (Date.now() < parsedUser.expiresAt) {
        setUser(parsedUser);
      } else {
        localStorage.removeItem("user"); 
      }
    }
  }, []);
  

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
  
      const now = Date.now();
      const timeout = user.expiresAt - now;
  
      if (timeout > 0) {
        const logoutTimer = setTimeout(() => {
          logout();
        }, timeout);
  
        return () => clearTimeout(logoutTimer);
      } else {
        toast.info("Sessão expirada. Faça login novamente.", {
          position: "top-right",
          autoClose: 5000,
        });
        logout();
      }
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
  

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
