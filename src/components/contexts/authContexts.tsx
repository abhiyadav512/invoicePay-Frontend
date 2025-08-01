import { createContext, useContext, useState, useEffect } from "react";
import { useGetProfile } from "../../apis/auth/useAuth";
import { LogoutUser } from "../../apis/auth/authApi";

interface User {
  id: string;
  name: string;
  email: string;
  number?: string;
  location?: string;
  dob?: Date;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

// Define the expected API response structure (matching your API)
interface ProfileApiResponse {
  data: User;
  message?: string;
  status?: string;
}

// Type guard to check if data has the expected structure
const isProfileApiResponse = (data: unknown): data is ProfileApiResponse => {
  return (
    typeof data === "object" &&
    data !== null &&
    "data" in data &&
    typeof (data as any).data === "object"
  );
};

// Type guard to check if data is a User object directly
const isUser = (data: unknown): data is User => {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    "name" in data &&
    "email" in data &&
    typeof (data as any).id === "string" &&
    typeof (data as any).name === "string" &&
    typeof (data as any).email === "string"
  );
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const { data, isPending, isError } = useGetProfile();
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    if (!isPending) {
      if (data && !isError) {
        // First, try to handle wrapped response (data.data structure)
        if (isProfileApiResponse(data)) {
          const userData = data.data;
          if (isUser(userData)) {
            setUser(userData);
          } else {
            console.warn(
              "Invalid user data structure in wrapped response:",
              userData
            );
            setUser(null);
          }
        }
        // Then, try to handle direct user response
        else if (isUser(data)) {
          setUser(data);
        }
        // Handle any other structure by checking if it has user properties
        else if (typeof data === "object" && data !== null) {
          const potentialUser = data as any;
          if (potentialUser.id && potentialUser.name && potentialUser.email) {
            setUser({
              id: potentialUser.id,
              name: potentialUser.name,
              email: potentialUser.email,
            });
          } else {
            console.warn("Unexpected data structure:", data);
            setUser(null);
          }
        } else {
          console.warn("Data is not an object:", data);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsAuthLoading(false);
    }
  }, [data, isPending, isError]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await LogoutUser();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading: isAuthLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
