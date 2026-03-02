
import {useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import apiClient from "../config/apiClient";


export default function AuthProvider({children}) {
  const [userId,setuserId]=useState(null);
  const [authLoading,setAuthLoading]=useState(true);

  //check session
  const checkSession=async ()=>{
    try {
        setAuthLoading(true)
        const res=await apiClient({
            method:"GET",
            url:"/api/auth/me"
        })
    if(res.data.user_id){
        setuserId(res.data.user_id)
    }else{
        setuserId(null)
    }
    } catch (error) {
        setuserId(null)
    }finally{
        setAuthLoading(false)
    }
  }

  useEffect(()=>{
    checkSession()
  },[])

  //logout
  const logout=  async()=>{
    try {
      setAuthLoading(true);
      await apiClient({
        method:"POST",
        url:"/api/auth/logout"
      })
    } catch (error) {
      console.log("Logout failed \n"+ error);
    }finally{
      setuserId(null);
      setAuthLoading(false);
    }
  }

  //login
  const login=async({email,password})=>{
    try {
      setAuthLoading(true);
      const res=await apiClient({
        method:"POST",
        url:"/api/auth/signin",
        data:{
          email,
          password
        }
      })
      await checkSession();
    
    } catch (error) {
      throw error;
    }finally{
      setAuthLoading(false);
    }
  }
  //all vals
  const values={
    authLoading,
    setAuthLoading,
    login,
    isAuthenticated: userId ? true : false,
    logout
  }
  return(
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}
