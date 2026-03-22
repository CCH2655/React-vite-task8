import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAsyncDelCart } from "../../slice/cartSlice";
import { currency } from "../../utils/filter";
import { Link } from "react-router";
import { RotatingLines } from "react-loader-spinner";
import useMessage from "../../hooks/useMessage";

function Cart() {
  const carts = useSelector(state => state.cart.carts);
  const final_total = useSelector(state => state.cart.final_total);
  const dispatch = useDispatch();
  const { showSuccess, showError } = useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleRemoveCart = (e, id) => {
    e.preventDefault();
    dispatch(createAsyncDelCart(id));
    showSuccess("成功移除購物車");
  };

  // const handleShowMore = (product) => {
  //   setLoadingProductId(product.id);
  //   // 模擬載入感
  //   setTimeout(() => {
  //     setSelectedProduct(product);
  //     setIsModalOpen(true);
  //     setLoadingProductId(null);
  //   }, 300);
  // };

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
            {carts.length == 0 && (
              <p className="text-sm text-gray-400 py-10 text-center italic font-medium">購物車內暫無商品</p>
            )}
            {carts.map(cartItem => (
              <div key={cartItem.id} className="flex gap-3 bg-gray-50 p-3 rounded-md relative group">
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
                    <div >
                      <Link to={`/product/${cartItem.product.id}`}>
                        <button type="button" className="font-bold text-base text-gray-500 hover:text-gray-800 leading-tight">

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
                      </button> */}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                     <span className="text-xs text-gray-400">NT$ {currency(cartItem.product.price)}</span>
                    <div className="flex items-center border border-gray-200 rounded bg-white overflow-hidden">
                      <button className="px-2 py-0.5 hover:bg-gray-100 text-gray-500 text-xs">-</button>
                      <input
                        type="text"
                        className="w-8 text-center text-xs focus:outline-none bg-transparent font-medium"
                        value={cartItem.qty}
                        readOnly
                      />
                      <button className="px-2 py-0.5 hover:bg-gray-100 text-gray-500 text-xs">+</button>
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
              {carts.map(item => (
                <div key={`detail-${item.id}`} className="flex text-xs text-gray-600 border-b border-gray-50 pb-1">
                  <span className="flex-grow truncate pr-2">{item.product.title}</span>
                  <span className="w-16 text-right">{currency(item.product.price)}</span>
                  <span className="w-12 text-right">x{item.qty}</span>
                  <span className="w-20 text-right font-medium">NT$ {currency(item.product.price * item.qty)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. 總計與結帳 */}
          <div className="mt-4 pt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-bold text-gray-600">總計金額</span>
              <span className="text-lg font-black text-gray-900">NT$ {currency(final_total)}</span>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-black hover:bg-gray-800 text-white text-center py-3 mt-3 rounded font-bold transition-all text-sm shadow-md active:scale-[0.98]"
            >
              立即結帳
            </Link>
          </div>
        </div>
      </div>

      {/* --- 優化後的 Modal --- */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)} // 點擊背景關閉
        >
          <div 
            className="bg-white w-full max-w-sm rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} // 防止點擊內容也觸發關閉
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-900">商品細節</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black p-1">
                  <i className="fas fa-times text-sm"></i>
                </button>
              </div>
              
              {selectedProduct && (
                <div className="space-y-3">
                  <img src={selectedProduct.imageUrl} className="w-full h-40 object-cover rounded shadow-inner" alt="" />
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{selectedProduct.title}</h4>
                    <div className="bg-gray-50 p-2 rounded mt-2 text-[11px] text-gray-500 leading-relaxed border border-gray-100">
                      商品 ID: {selectedProduct.id}<br/>
                      這是一段測試用的詳細描述資訊，展示 Tailwind Modal 的緊湊排版。
                    </div>
                  </div>
                </div>
              )}

              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full mt-4 bg-gray-100 text-gray-800 py-2 rounded font-bold hover:bg-gray-200 transition text-xs"
              >
                確認並返回
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;