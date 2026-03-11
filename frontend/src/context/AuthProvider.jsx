
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import apiClient from "../config/apiClient";
import MainContext from "./MainContext";
import { useContext } from "react";


export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { showNotice } = useContext(MainContext);

  //check session
  const checkSession = async () => {
    try {
      setAuthLoading(true)
      const res = await apiClient({
        method: "GET",
        url: "/api/auth/me"
      })

      setUser(res.data.user || null);
    } catch (error) {
      setUser(null)
    } finally {
      setAuthLoading(false)
    }
  }

  //401 handling
  useEffect(() => {

    //initial session check + on page refresh 
    if (!user) {
      checkSession();
    }

    // Setup 401 interceptor
    const interceptor = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          setUser(null);
          setAuthLoading(false);
          showNotice({ msg: "Session expired. Please login again.", type: "warning", duration: 10000 });
          setTimeout(() => {
            window.location.href = "/login";
          }, 1000);
        }
        return Promise.reject(error);
      }
    );


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
      localStorage.setItem("selectedModel", "");
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
        showNotice({ msg: `Welcome ${res.data.user.name} !`, type: "success", duration: 3000 });
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
    isAuthenticated: !!user,
    logout
  }
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}
