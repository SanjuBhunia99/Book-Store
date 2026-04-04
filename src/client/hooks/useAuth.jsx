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

  const register = async (payload) => {
    const { data } = await api.post("/api/v1/users/register", payload);
    setAccessToken(data.token);
    decodeAndSetUser(data.token);
    return data;
  };

 
  const login = async (payload) => {
    const { data } = await api.post("/api/v1/users/login", payload);
    setAccessToken(data.token);
    decodeAndSetUser(data.token);
    return data;
  };

  const adminLogin = async (payload) => {
    const { data } = await api.post("/api/v1/admin/login", payload);
    setAccessToken(data.token);
    decodeAndSetUser(data.token);
    return data;
  };


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
        isAdmin: !!admin, 
        register,
        login,
        adminLogin, 
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
