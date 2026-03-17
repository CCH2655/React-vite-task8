import axios from "axios";
import { useEffect, useState } from "react";
import { RotatingLines, RotatingTriangles } from "react-loader-spinner";
import { Navigate } from "react-router";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];

    if (token) {
      axios.defaults.headers.common.Authorization = token;
    }

    const checkLogin = async () => {
      try {
        await axios.post(`${API_BASE}/api/user/check`);
        setIsAuth(true);
      } catch (err) {
        // console.log("權限檢查失敗：", err.response?.data?.message);
      } finally {
        setLoading(false)
      }
    };
    
    checkLogin();

  }, []);


  if(loading) return <RotatingLines />;
  if(!isAuth) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;