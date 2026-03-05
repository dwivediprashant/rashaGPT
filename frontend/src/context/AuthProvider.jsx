
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import apiClient from "../config/apiClient";


export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  //check session
  const checkSession = async () => {
    try {
      setAuthLoading(true)
      const res = await apiClient({
        method: "GET",
        url: "/api/auth/me"
      })
      if (res.data.user) {
        setUser(res.data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      setUser(null)
    } finally {
      setAuthLoading(false)
    }
  }

  //401 : session expired
  useEffect(() => {
    // Setup 401 interceptor
    const interceptor = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          setUser(null);
          setAuthLoading(false);
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );

    //intila session check
    if (!user) {
      checkSession();
    }


    return () => {
      apiClient.interceptors.response.eject(interceptor);
    };
  }, [user]);



  //logout
  const logout = async () => {
    try {
      setAuthLoading(true);
      await apiClient({
        method: "POST",
        url: "/api/auth/logout"
      })
    } catch (error) {
      console.log("Logout failed \n" + error);
    } finally {
      setUser(null);
      setAuthLoading(false);
    }
  }

  //login
  const login = async ({ email, password, phoneNumber }) => {

    try {
      setAuthLoading(true);
      const res = await apiClient({
        method: "POST",
        url: "/api/auth/signin",
        data: {
          email,
          password,
          phoneNumber,
        }
      })
      await checkSession();
      return res;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading(false);
    }
  }

  //verify otp

  const verifyOtp = async ({ otp }) => {
    try {
      setAuthLoading(true);
      const res = await apiClient({
        method: "POST",
        url: "/api/auth/verify-otp",
        data: {
          otp,
        }
      })
      if (res.data?.success) {
        setUser(res.data.user);
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading(false);
    }
  }
  //all vals
  const values = {
    user,
    setUser,
    authLoading,
    setAuthLoading,
    login,
    verifyOtp,
    isAuthenticated: user ? true : false,
    logout
  }
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}
