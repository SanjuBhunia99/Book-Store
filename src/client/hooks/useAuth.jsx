import { jwtDecode } from "jwt-decode";
import { useState, useEffect, createContext, useContext } from "react";
import api, { setAccessToken } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const decodeAndSetUser = (token) => {
    if (!token) {
      setUser(null);
      setAdmin(null);
      return;
    }

    try {
      const decoded = jwtDecode(token);

      // role check
      if (decoded.role === "admin") {
        setAdmin(decoded);
        setUser(null);
      } else {
        setUser(decoded);
        setAdmin(null);
      }
    } catch (error) {
      console.log("Token decode error:", error);
      setUser(null);
      setAdmin(null);
    }
  };

  // refresh token (user only)
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await api.post("/api/v1/users/refresh-token");
        setAccessToken(data.accessToken);
        decodeAndSetUser(data.accessToken);
      } catch {
        setUser(null);
        setAdmin(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  //  USER REGISTER
  const register = async (payload) => {
    const { data } = await api.post("/api/v1/users/register", payload);
    setAccessToken(data.token);
    decodeAndSetUser(data.token);
    return data;
  };

  // USER LOGIN
  const login = async (payload) => {
    const { data } = await api.post("/api/v1/users/login", payload);
    setAccessToken(data.token);
    decodeAndSetUser(data.token);
    return data;
  };

  // ADMIN LOGIN 
  const adminLogin = async (payload) => {
    const { data } = await api.post("/api/v1/admin/login", payload);
    setAccessToken(data.token);
    decodeAndSetUser(data.token);
    return data;
  };

  // LOGOUT (both)
  const logout = async () => {
    try {
      await api.get("/api/v1/user/logout", { withCredentials: true });
    } catch {
    } finally {
      setUser(null);
      setAdmin(null);
      setAccessToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        isLoggedIn: !!user,
        isAdmin: !!admin, //  admin flag
        register,
        login,
        adminLogin, //  exposed
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default useAuth;
