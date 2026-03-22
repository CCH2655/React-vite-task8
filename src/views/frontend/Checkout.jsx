import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useMessage from "../../hooks/useMessage";
import { currency } from "../../utils/filter";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createAsyncGetOrder } from "../../slice/orderSlice";
import { createAsyncGetCart } from "../../slice/cartSlice";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Checkout() {
  const carts = useSelector(state => state.cart.carts);
  const final_total = useSelector(state => state.cart.final_total);
  const { showSuccess, showError } = useMessage();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });


  // 送出訂單
  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const data = {
        user: {
          name: formData.name,
          email: formData.email,
          tel: formData.tel,
          address: formData.address,
        },
        message: formData.message,
      };
      const url = `${API_BASE}/api/${API_PATH}/order`;
      const response = await axios.post(url, { data });

      dispatch(createAsyncGetCart());
      dispatch(createAsyncGetOrder(response.data.orderId));

      showSuccess("訂單已成功送出");
      reset();
      navigate("/checkout-success"); // 導向成功頁面
    } catch (error) {
      showError(error.response?.data?.message || "送出失敗");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 md:py-16">
      <div className="container mx-auto px-4 lg:px-20">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col-reverse md:flex-row gap-8 lg:gap-12 justify-center">
          
          {/* 左側表單區 */}
          <div className="md:w-7/12 lg:w-6/12 space-y-6">
            
            {/* 1. 聯絡資訊 */}
            <div className="bg-white p-6 md:p-8 shadow-sm rounded-sm">
              <h4 className="text-xl font-black text-gray-900 mb-6 tracking-tight">1. 訂件人資訊</h4>
              <div className="space-y-5">
                
                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="email" className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    電子郵件 *
                  </label>
                  <input
                    {...register("email", {
                      required: "請輸入 Email",
                      pattern: { value: /^\S+@\S+$/i, message: "Email 格式不正確" },
                    })}
                    type="email"
                    id="email"
                    className={`w-full border-gray-200 rounded-sm text-sm focus:border-black focus:ring-0 transition-colors ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="example@gmail.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm font-bold mt-1">{errors.email.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      收件人姓名 *
                    </label>
                    <input
                      {...register("name", { required: "請輸入姓名", minLength: { value: 2, message: "姓名最少 2 個字" } })}
                      type="text"
                      id="name"
                      className={`w-full border-gray-200 rounded-sm text-sm focus:border-black focus:ring-0 transition-colors ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="請輸入真實姓名"
                    />
                    {errors.name && <p className="text-red-500 text-sm font-bold mt-1">{errors.name.message}</p>}
                  </div>
                  {/* Phone */}
                  <div className="space-y-1">
                    <label htmlFor="tel" className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      電話 *
                    </label>
                    <input
                      {...register("tel", { 
                        required: "請輸入電話", 
                        pattern: { value: /^\d+$/, message: "請輸入有效數字" },
                        minLength: { value: 8, message: "至少 8 碼" }
                      })}
                      type="text"
                      id="tel"
                      className={`w-full border-gray-200 rounded-sm text-sm focus:border-black focus:ring-0 transition-colors ${errors.tel ? 'border-red-500' : ''}`}
                      placeholder="0912345678"
                    />
                    {errors.tel && <p className="text-red-500 text-sm font-bold mt-1">{errors.tel.message}</p>}
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-1">
                  <label htmlFor="address" className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    收件地址 *
                  </label>
                  <input
                    {...register("address", { required: "請輸入收件地址" })}
                    type="text"
                    id="address"
                    className={`w-full border-gray-200 rounded-sm text-sm focus:border-black focus:ring-0 transition-colors ${errors.address ? 'border-red-500' : ''}`}
                    placeholder="縣市、街道、門牌、樓層"
                  />
                  {errors.address && <p className="text-red-500 text-sm font-bold mt-1">{errors.address.message}</p>}
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="message" className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    訂單備註
                  </label>
                  <textarea
                    {...register("message")}
                    id="message"
                    rows="3"
                    className="w-full border-gray-200 rounded-sm text-sm focus:border-black focus:ring-0 transition-colors"
                    placeholder="有什麼想告訴我們的嗎？"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* 按鈕區 */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 pt-4">
              <Link to="/cart" className="text-sm font-bold text-gray-400 hover:text-black transition-colors flex items-center gap-2">
                <i className="fas fa-chevron-left text-[10px]"></i> 返回購物車
              </Link>
              <button 
                type="submit" 
                disabled={isSubmitting || carts.length == 0}
                className="w-full md:w-auto bg-black text-white px-12 py-4 font-bold tracking-[0.2em] text-xs hover:bg-gray-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "訂單處理中..." : "確認下單"}
              </button>
            </div>
          </div>

          {/* 右側訂單摘要 (Sticky) */}
          <div className="md:w-5/12 lg:w-4/12">
            <div className="bg-white border border-gray-100 p-6 sticky top-28 shadow-sm">
              <h4 className="text-lg font-black text-gray-900 mb-6 border-b border-gray-50 pb-4">訂單摘要</h4>
              
              <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {carts?.map((cartItem) => (
                  <div key={cartItem.id} className="flex gap-4">
                    <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded-sm overflow-hidden">
                      <img
                        src={cartItem.product.imageUrl}
                        alt={"cart image"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start gap-2">
                        <p className="text-xs font-bold text-gray-800 line-clamp-2">{cartItem.product.title}</p>
                        <p className="text-xs font-black text-gray-900">x{cartItem.qty}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-gray-500">NT$ {currency(cartItem.final_total)}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {carts.length == 0 && (
                  <p className="text-sm text-gray-400 py-10 text-center italic font-medium">購物車內暫無商品</p>
                )}
              </div>

              {/* 金額計算 */}
              <div className="border-t border-gray-100 pt-6 space-y-3">
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                  <span>小計</span>
                  <span>NT$ {currency(final_total || 0)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                  <span>運費</span>
                  <span className="text-green-600 font-bold">免運費</span>
                </div>
                <div className="flex justify-between items-baseline pt-4 border-t border-gray-50 mt-2">
                  <p className="text-base font-black text-gray-900 uppercase tracking-tighter">總計</p>
                  <p className="text-xl font-black text-gray-900">NT$ {currency(final_total || 0)}</p>
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Checkout;