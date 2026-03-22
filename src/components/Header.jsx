import { useEffect, useState } from "react"; // 新增 useState 處理手機版選單
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router"; // 註：若為 react-router-dom 請更正
import { createAsyncGetCart } from "../slice/cartSlice";
import useMessage from "../hooks/useMessage";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

function Header({ headerType = "frontend" }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const carts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();
  const { showSuccess, showError } = useMessage();

  useEffect(() => {
    dispatch(createAsyncGetCart());
  }, [dispatch]);

  const logout = async () => {
    try {
      await axios.post(`${API_BASE}/logout`);
      document.cookie = `hexToken=;expires=;`;
      axios.defaults.headers.common.Authorization = '';

      showSuccess("已登出");
      navigate("/login");
    } catch (error) {
      showError("登出失敗: " + error.response);
    }
  }

  return (
    <div className="bg-[#E3D5C8] sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto flex flex-wrap items-center justify-between py-2 px-4">
        {/* Logo */}
        <Link to="/">
          <button type="button" className="text-5xl font-bold text-gray-800">
            紙葉之境
          </button>
        </Link>

        {/* 手機版漢堡按鈕 */}
        <button
          className="block lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* 切換圖示：開啟時顯示 X，關閉時顯示 ☰ */}
          <span className="text-2xl">{isOpen ? "✕" : "☰"}</span>
        </button>

        {/* 導覽連結容器 */}
        {/* 關鍵修正：使用樣板字串判斷 isOpen */}
        <div className={`${isOpen ? "block" : "hidden"} w-full lg:flex lg:w-auto lg:items-center transition-all duration-300`} >
          <div className="flex flex-col mt-4 lg:flex-row lg:mt-0 lg:space-x-8 items-center">
            {
              headerType === "frontend" ?
              // 前台header列表
              <>
                <Link
                  to="/product"
                  onClick={() => setIsOpen(false)}
                >
                  <button type="button" className="py-2 text-gray-700 hover:text-black font-medium transition">
                    商品列表
                  </button>
                </Link>

                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                >
                  <button type="button" className="relative py-2 text-gray-700 hover:text-black transition">
                    <i className="fas fa-shopping-cart text-lg"></i>
                    {carts.length > 0 && (
                      <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                        {carts.length}
                      </span>
                    )}
                  </button>
                </Link>

                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                >
                  <button type="button" className="py-2 text-gray-700 hover:text-black font-medium transition">
                    <i className="fa-regular fa-circle-user"></i>
                  </button>
                </Link>
              </>
              :
              // 後台header列表
              <>
                <Link
                  to="/admin/product"
                  onClick={() => setIsOpen(false)}
                >
                  <button type="button" className="py-2 text-gray-700 hover:text-black font-medium transition">
                    商品管理
                  </button>
                </Link>

                <Link
                  to="/admin/order"
                  onClick={() => setIsOpen(false)}
                >
                  <button type="button" className="py-2 text-gray-700 hover:text-black font-medium transition">
                    訂單管理
                  </button>
                </Link>

                <button
                  className="py-2 text-gray-700 hover:text-black font-medium transition"
                  // to="/product"
                  onClick={() => logout()}
                >
                  登出
                </button>
              </>
            }
            
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
