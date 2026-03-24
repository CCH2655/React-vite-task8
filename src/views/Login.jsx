import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useMessage from "../hooks/useMessage";

const API_BASE = import.meta.env.VITE_API_BASE;

function Login() {
  const navigate = useNavigate();
  const { showSuccess } = useMessage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(`${API_BASE}/admin/signin`, formData);
      const { token, expired } = response.data;
      document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
      axios.defaults.headers.common.Authorization = `${token}`;

      navigate(`/admin/product`);
      showSuccess('成功登入');
    } catch (error) {
      alert(error.response?.data?.message || '登入失敗');
    }
  };

  return (
    // min-h-screen 確保全螢幕高度居中
    <div className="flex flex-col items-center justify-center p-4 min-h-[calc(100vh-160px)]">
      {/* Card 容器 */}
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">請先登入</h1>
            <p className="text-gray-500 mt-2">後台管理系統</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email 欄位 */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="username"
                placeholder="name@example.com"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#E3D5C8] focus:border-[#E3D5C8] outline-none transition ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
                {...register('username', {
                  required: '請輸入 Email',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email 格式不正確",
                  },
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Password 欄位 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="請輸入密碼"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#E3D5C8] focus:border-[#E3D5C8] outline-none transition ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                {...register("password", {
                  required: "請輸入密碼",
                  minLength: {
                    value: 6,
                    message: "密碼長度至少需 6 碼",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* 登入按鈕 */}
            <button
              type="submit"
              className="w-full bg-gray-800 hover:bg-black text-white font-bold py-3 rounded-lg transition duration-200 shadow-md active:transform active:scale-[0.98]"
            >
              登入
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;