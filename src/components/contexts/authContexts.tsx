import React, { createContext, useContext, useState, useEffect } from "react";
import { useGetProfile } from "../../apis/auth/useAuth";
import { LogoutUser } from "../../apis/auth/authApi";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const { data, isPending } = useGetProfile();
  const [isAuthLoading, setIsAuthLoading] = useState(true);


  useEffect(() => {
    if (!isPending) {
      const userData = data?.data;
      setUser(userData || null);
      setIsAuthLoading(false);
    }
  }, [data, isPending]);



  const login = (userData: User) => setUser(userData);

  const logout = async () => {
    try {
      await LogoutUser();
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading :isAuthLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export { AuthProvider, useAuth };
