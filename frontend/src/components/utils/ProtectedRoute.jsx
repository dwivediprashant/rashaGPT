
import AuthContext from "../../context/AuthContext"
import Loader7 from "../Loaders/Loader7";
import { useNavigate } from "react-router"; 
import { useContext, useEffect } from "react";
export default function ProtectedRoute({children}) {
    const navigate = useNavigate();
  const {authLoading,isAuthenticated}=useContext(AuthContext);


useEffect(()=>{
    if(!authLoading && !isAuthenticated){
    navigate("/login");
    } 
  },[authLoading,isAuthenticated,navigate])


   if(authLoading){
    return <Loader7/>;
  }
  return children;
}
