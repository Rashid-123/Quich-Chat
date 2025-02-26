import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const router = useRouter();

      // Simulate fetching user from localStorage
      useEffect(() => {
            const loggedUser = JSON.parse(localStorage.getItem("user"));
            if (loggedUser) setUser(loggedUser);
      }, []);

      const login = (userData) => {
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
            router.push("/friends"); // Redirect after login
      };

      const logout = () => {
            localStorage.removeItem("user");
            setUser(null);
            router.push("/login");
      };

      return (
            <AuthContext.Provider value={{ user, login, logout }}>
                  {children}
            </AuthContext.Provider>
      );
};

export const useAuth = () => useContext(AuthContext);
