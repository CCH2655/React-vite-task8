import { useDispatch, useSelector } from "react-redux";
import {
  createAsyncDelCart,
  createAsyncUpdateCart,
} from "../../slice/cartSlice";
import { currency } from "../../utils/filter";
import { Link } from "react-router";
import { RotatingLines } from "react-loader-spinner";
import useMessage from "../../hooks/useMessage";

function Cart() {
  const carts = useSelector((state) => state.cart.carts);
  const final_total = useSelector((state) => state.cart.final_total);
  const dispatch = useDispatch();
  const { showSuccess } = useMessage();

  const handleRemoveCart = (e, id) => {
    e.preventDefault();
    dispatch(createAsyncDelCart(id));
    showSuccess("成功移除購物車");
  };

  const updateCartItem = (cartItem, newQty) => {
    // 數量如果小於 1 則不執行 (防止按減號減到 0)
    if (newQty < 1) return;
    // 觸發更新 API
    // 傳入購物車項目的 ID (不是產品 ID) 以及新的數量
    dispatch(
      createAsyncUpdateCart({
        id: cartItem.id,
        product_id: cartItem.product_id,
        qty: newQty,
      }),
    );
  };

  return (
    <div className="container mx-auto px-4 py-4 relative">
      <div className="flex justify-center">
        <div className="w-full max-w-xl bg-white p-5 shadow-sm rounded-lg">
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-xl font-bold text-gray-800">購物車</h2>
            <span className="text-sm text-gray-500">{carts.length} 項目</span>
          </div>

          {/* 1. 商品卡片列表 */}
          <div className="space-y-2 mb-6">
            {carts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                {/* 裝飾性圖示：使用一個簡單的購物籃圖示 */}
                <div className="mb-6 text-gray-200">
                  <i className="fas fa-shopping-basket text-6xl"></i>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  您的購物車是空的
                </h3>
                <p className="text-sm text-gray-400 mb-8 max-w-[200px] leading-relaxed">
                  似乎還沒有找到心儀的書籍？
                  <br />
                  快去探索更多精彩故事吧。
                </p>

                <Link to="/product">
                  <button
                    type="button"
                    className="rounded px-10 py-3 bg-black text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-800 transition-all shadow-sm active:scale-95"
                  >
                    挑選書籍
                  </button>
                </Link>
              </div>
            )}
            {carts.map((cartItem) => (
              <div
                key={cartItem.id}
                className="flex gap-3 bg-gray-50 p-3 rounded-md relative group"
              >
                <button
                  className="absolute top-2 right-2 text-black hover:text-red-600 transition-colors"
                  onClick={(e) => handleRemoveCart(e, cartItem.id)}
                >
                  <i className="fas fa-times text-sm"></i>
                </button>

                <img
                  src={cartItem.product.imageUrl}
                  alt={cartItem.product.title}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded shadow-sm"
                />

                <div className="flex flex-col justify-between flex-grow py-0.5">
                  <div>
                    <div>
                      <Link to={`/product/${cartItem.product.id}`}>
                        <button
                          type="button"
                          className="font-bold text-base text-gray-500 hover:text-gray-800 leading-tight"
                        >
                          {cartItem.product.title}
                        </button>
                      </Link>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      {/* <button 
                        onClick={() => handleShowMore(cartItem.product)}
                        disabled={loadingProductId === cartItem.product.id}
                        className="px-2 py-1 overflow-hidden bg-white border border-gray-200 text-[10px] text-gray-600 rounded hover:bg-gray-100 hover:text-black transition-all flex items-center justify-center min-w-[60px] shadow-sm active:scale-95 disabled:opacity-70"
                      >
                        {loadingProductId === cartItem.product.id ? (
                          <RotatingLines color="grey" width={80} height={16} />
                        ) : (
                          "查看詳細"
                        )}
                      </button>
                    </div>

                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400">
                      NT$ {currency(cartItem.product.price)}
                    </span>
                    <div className="flex items-center border border-gray-200 rounded bg-white overflow-hidden">
                      {/* <button className="px-2 py-0.5 hover:bg-gray-100 text-gray-500 text-xs">-</button>
                      <input
                        type="text"
                        className="w-8 text-center text-xs focus:outline-none bg-transparent font-medium"
                        value={cartItem.qty}
                        readOnly
                      />
                      <button className="px-2 py-0.5 hover:bg-gray-100 text-gray-500 text-xs">+</button> */}

                      <button
                        type="button"
                        onClick={() =>
                          updateCartItem(cartItem, cartItem.qty - 1)
                        }
                        disabled={cartItem.qty <= 1} // 數量為 1 時禁用按鈕
                        className={`px-2 py-0.5 hover:bg-gray-100 text-gray-500 text-xs transition-colors ${cartItem.qty <= 1 ? "cursor-not-allowed opacity-30" : ""}`}
                      >
                        <i className="fas fa-minus"></i>
                      </button>

                      <input
                        type="text"
                        className="w-8 text-center text-xs focus:outline-none bg-transparent font-black text-gray-900"
                        value={cartItem.qty}
                        readOnly
                      />

                      <button
                        type="button"
                        onClick={() =>
                          updateCartItem(cartItem, cartItem.qty + 1)
                        }
                        className="px-2 py-0.5 hover:bg-gray-100 text-gray-500 text-xs transition-colors"
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <span className="font-bold text-gray-800 text-sm">
                      NT$ {currency(cartItem.product.price * cartItem.qty)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 2. 商品明細清單 (省略，保持不變) */}
          <div className="border-t pt-4">
            <div className="flex text-[10px] text-gray-400 font-bold uppercase mb-2 px-1">
              <span className="flex-grow">商品名稱</span>
              <span className="w-16 text-right">單價</span>
              <span className="w-12 text-right">數量</span>
              <span className="w-20 text-right">總價</span>
            </div>
            <div className="space-y-1 px-1">
              {carts.map((item) => (
                <div
                  key={`detail-${item.id}`}
                  className="flex text-xs text-gray-600 border-b border-gray-50 pb-1"
                >
                  <span className="flex-grow truncate pr-2">
                    {item.product.title}
                  </span>
                  <span className="w-16 text-right">
                    {currency(item.product.price)}
                  </span>
                  <span className="w-12 text-right">x{item.qty}</span>
                  <span className="w-20 text-right font-medium">
                    NT$ {currency(item.product.price * item.qty)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. 總計與結帳 */}
          <div className="mt-4 pt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-bold text-gray-600">總計金額</span>
              <span className="text-lg font-black text-gray-900">
                NT$ {currency(final_total)}
              </span>
            </div>

            <Link to="/checkout">
              <button
                type="button"
                disabled={carts.length === 0}
                className={`mt-3 w-full py-3 rounded text-base font-bold tracking-[0.2em] transition-all duration-300 ease-in-out
                  ${carts.length === 0 
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none" 
                    : "bg-black text-white hover:bg-[#1a1a1a] hover:shadow-lg hover:-translate-y-0.5 shadow-md active:scale-[0.98]"
                  }`}
              >
                {carts.length === 0 ? (
                  <>
                    請先挑選商品
                  </>
                ) : (
                  "立即結帳"
                )}
              </button>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
