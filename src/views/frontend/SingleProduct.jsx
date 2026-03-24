import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router";
import { createAsyncAddCart } from "../../slice/cartSlice";
import { getProductApi } from "../../services/product";
import useMessage from "../../hooks/useMessage";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [openSection, setOpenSection] = useState(0);
  const dispatch = useDispatch();
  const { showSuccess } = useMessage();

  useEffect(() => {
    const getProduct = async (productId) => {
      try {
        const response = await getProductApi(productId);
        setProduct(response.data.product);
      } catch (error) {
        console.error(error);
      }
    };
    getProduct(id);
  }, [id]);

  const handleAddCart = (e, productId, quantity) => {
    e.preventDefault();
    dispatch(createAsyncAddCart({ id: productId, qty: quantity }));
    showSuccess("成功加入購物車");
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-10 lg:px-20">
        {/* 麵包屑導覽 */}
        <nav className="mb-10 text- text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
          <Link to="/product">
            <button type="button" className="hover:text-black transition-colors pb-0.5"> 
              商品列表
            </button>
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-bold">{product.title}</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          {/* 左側內容區：主圖 + 描述 + 多圖 */}
          <div className="md:w-3/5">
            {/* 主圖：縮小高度限制 */}
            <div className="mb-8 bg-gray-50 rounded-sm flex justify-center p-2">
              <img
                src={product.imageUrl}
                className="max-w-full max-h-[300px] object-contain"
                alt={product.title}
              />
            </div>

            {/* 額外圖片渲染 (imagesUrl 判斷) */}
            {product.imagesUrl && product.imagesUrl.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-10">
                {product.imagesUrl.map((url, index) => (
                  url && (
                    <div key={index} className="aspect-square bg-gray-50 rounded-sm overflow-hidden border border-gray-100">
                      <img src={url} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity cursor-pointer" alt={`detail-${index}`} />
                    </div>
                  )
                ))}
              </div>
            )}

            {/* 文字介紹區 */}
            <div className="space-y-6 mb-12">
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">{product.title}</h1>
              <p className="text-gray-500 leading-relaxed text-sm border-l-2 border-gray-100 pl-4">
                {product.description}
              </p>
              {/* 商品詳細內容 (content) */}
              <div className="text-gray-600 text-sm leading-loose whitespace-pre-line">
                {product.content}
              </div>
            </div>

            {/* 手風琴區 */}
            <div className="border-t border-gray-100 pt-2">
              {[
                { title: "運送方式", content: "我們提供宅配、超商取貨等多元運送方式，預計 3-5 個工作天內送達。" },
                { title: "退換貨須知", content: "享有 7 天鑑賞期（非試用期），商品需保持全新包裝完整方可申請退貨。" }
              ].map((item, index) => (
                <div key={index} className="border-b border-gray-100">
                  <button
                    onClick={() => setOpenSection(openSection === index ? -1 : index)}
                    className="w-full py-3 flex justify-between items-center text-left hover:text-gray-600"
                  >
                    <span className="text-sm font-bold tracking-tight text-gray-800">{item.title}</span>
                    <i className={`fas ${openSection === index ? 'fa-minus' : 'fa-plus'} text-[9px] text-gray-400`}></i>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openSection === index ? 'max-h-40 pb-4' : 'max-h-0'}`}>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右側購買控制欄 (更精簡的樣式) */}
          <div className="md:w-2/5">
            <div className="sticky top-28 space-y-8">
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-black text-gray-900">NT$ {product.price?.toLocaleString()}</span>
                  {product.origin_price !== product.price && (
                    <span className="text-gray-300 line-through text-xs italic font-medium">NT$ {product.origin_price?.toLocaleString()}</span>
                  )}
                </div>
              </div>

              {/* 數量選擇與加入按鈕：改為並排或縮小比例 */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* 數量選擇器 (顯示數字樣式) */}
                <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden bg-white h-12">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="px-4 h-full hover:bg-gray-50 text-gray-400 transition-colors"
                  >
                    <i className="fas fa-minus text-[10px]"></i>
                  </button>
                  <div className="w-12 text-center text-sm font-black text-gray-900 select-none">
                    {qty}
                  </div>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="px-4 h-full hover:bg-gray-50 text-gray-400 transition-colors"
                  >
                    <i className="fas fa-plus text-[10px]"></i>
                  </button>
                </div>

                {/* 加入購物車按鈕：不再全寬，調整為更平衡的大小 */}
                <button
                  onClick={(e) => handleAddCart(e, product.id, qty)}
                  className="flex-grow bg-black text-white px-8 h-12 font-bold tracking-widest text-[11px] hover:bg-gray-800 transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-3"
                >
                  <i className="fas fa-shopping-bag text-[10px]"></i>
                  加入購物車
                </button>
              </div>

              <div className="text-xs pt-4 border-t border-gray-100 flex flex-col gap-3">
                <div className="flex items-center gap-3  text-gray-400 font-medium">
                  <i className="fas fa-check text-[8px] p-1 bg-gray-50 rounded-full"></i>
                  全台免運費（滿 NT$ 2,000）
                </div>
                <div className="flex items-center gap-3  text-gray-400 font-medium">
                  <i className="fas fa-check text-[8px] p-1 bg-gray-50 rounded-full"></i>
                  7 天無理由退換貨服務
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;