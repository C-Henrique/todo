import { createContext, useContext, useState } from "react";
import { executeBasicAuthenticationService } from "../api/HelloWordApiService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  async function login(username, password) {
    const bsToken = "Basic " + window.btoa(username + ":" + password);

    try {
      const response = await executeBasicAuthenticationService(bsToken);

      if (response.status == 200) {
        setIsAuthenticated(true);
        setUsername(username);
        setToken(bsToken);
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }
  function logout() {
    setUsername(null);
    setIsAuthenticated(false);
    setToken(null);
  }
  return (
    <AuthContext.Provider value={{ username, isAuthenticated, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}
