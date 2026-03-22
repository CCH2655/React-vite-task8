import { useSelector } from "react-redux";
import { Link } from "react-router";

function CheckoutSuccess() {
  const order = useSelector(state => state.order.order);

  // 計算小計（若後端沒直接給總額，可以用這個）
  const subtotal = order?.total || 0;

  return (
    <div className="bg-white min-h-screen">
      <div 
        className="w-full h-[300px] md:h-[400px] bg-cover bg-center grayscale shadow-inner"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
        }}
      ></div>

      <div className="container mx-auto px-4 lg:px-20 py-12 md:py-20">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 justify-center">
          
          <div className="md:w-1/2 space-y-6">
            <div className="inline-block bg-black text-white px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
              Payment Confirmed
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
              訂購成功
            </h2>
            <p className="text-gray-500 leading-relaxed max-w-md">
              感謝您的購買，<span className="text-black font-bold">{order?.user?.name}</span> 先生/小姐！您的訂單已進入處理流程。
              我們將透過 <span className="underline">{order?.user?.email}</span> 與您聯繫，預計於 3-5 個工作天內送達。
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link to="/" className="inline-block bg-black text-white px-10 py-4 text-xs font-bold tracking-[0.2em] hover:bg-gray-800 transition-all text-center">
                返回首頁
              </Link>
              <Link to="/product" className="inline-block border border-gray-200 text-gray-900 px-10 py-4 text-xs font-bold tracking-[0.2em] hover:bg-gray-50 transition-all text-center">
                繼續購物
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 lg:w-5/12">
            <div className="border border-gray-100 p-8 shadow-sm bg-white">
              <h4 className="text-lg font-black text-gray-900 mb-8 border-b border-gray-50 pb-4 tracking-tight">
                購物明細
              </h4>
              
              {/* 動態商品列表 */}
              <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2">
                {order?.products && Object.values(order.products).map((item) => (
                  <div className="flex gap-4" key={item.id}>
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-50 grayscale hover:grayscale-0 transition-all">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <p className="text-xs font-bold text-gray-900 leading-tight">
                          {item.product.title}
                        </p>
                        <p className="text-xs font-black text-gray-900">x{item.qty}</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Unit Price</p>
                        <p className="text-sm font-bold text-gray-900">
                          NT$ {item.product.price?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 金額統計區 */}
              <div className="border-t border-gray-100 pt-6 space-y-3">
                <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>小記</span>
                  <span>NT$ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>運費</span>
                  <span className="text-gray-900">FREE</span>
                </div>
                {/* <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>Order ID</span>
                  <span className="text-gray-900">{order?.id}</span>
                </div> */}
                
                <div className="flex justify-between items-baseline pt-6 border-t border-gray-50 mt-4">
                  <p className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">總計</p>
                  <p className="text-2xl font-black text-gray-900 tracking-tighter">
                    NT$ {order?.total?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccess;