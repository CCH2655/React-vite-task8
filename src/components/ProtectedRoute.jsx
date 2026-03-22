import axios from "axios";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Navigate } from "react-router";

const API_BASE = import.meta.env.VITE_API_BASE;

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
        // console.log("權限檢查失敗");
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  // 調整樣式後的 Loading 畫面
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#f5f2ed", // 使用柔和的淺灰色，或換成 #1a1a1a (深色模式)
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <RotatingLines
            strokeColor="#1f1f1f"
            strokeWidth="5"
            animationDuration="0.75"
            width="60"
            visible={true}
          />
          <p style={{ marginTop: "15px", color: "#666", fontSize: "14px" }}>
            確認權限中...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuth) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;