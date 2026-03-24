import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllProductsApi, getProductsApi } from "../../services/product";
import Pagination from "../../components/Pagination";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurremtCategory] = useState("all");
  const [pagination, setPagination] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await getAllProductsApi();
        const result = ["all", ...new Set(response.data.products.map((p) => p.category))];
        setCategories(result);
      } catch (error) { 
        console.log(error);
       }
    };
    getAllProducts();
  }, []);

  const getProducts = async (page = 1, category = currentCategory) => {
    try {
      const targetCategory = category === 'all' ? '' : category;
      const response = await getProductsApi(page, targetCategory);
      
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getFirstProducts = async (page = 1, category = currentCategory) => {
      try {
        const targetCategory = category === 'all' ? '' : category;
        const response = await getProductsApi(page, targetCategory);
        
        setProducts(response.data.products);
        setPagination(response.data.pagination);
      } catch (error) {
        console.log(error);
      }
    };
    getFirstProducts(1, currentCategory);
  }, [currentCategory]);

  const handleViewDetail = (e, id) => {
    e.preventDefault();
    navigate(`/product/${id}`);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* --- 左側分類側邊欄 --- */}
          <aside className="w-full md:w-48 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* 第一組分類 */}
              <div>
                <span className="block text-[11px] font-bold tracking-[0.15em] text-gray-400 mb-4 border-l-2 border-gray-200 pl-2">
                  篩選商品
                </span>
                <ul className="space-y-1">
                  <li>
                    <button 
                      onClick={() => setCurremtCategory("all")}
                      className={`w-full text-left px-3 py-2 rounded text-xs transition-all ${
                        currentCategory === 'all' 
                        ? 'bg-black text-white font-bold shadow-sm' 
                        : 'hover:bg-gray-100 text-gray-500'
                      }`}
                    >
                      全部商品
                    </button>
                  </li>
                </ul>
              </div>

              {/* 第二組分類 */}
              <div>
                <span className="block text-[11px] font-bold tracking-[0.15em] text-gray-400 mb-4 border-l-2 border-gray-200 pl-2">
                  產品分類
                </span>
                <div className="flex flex-col gap-1">
                  {categories.filter(c => c !== 'all').map((category) => (
                    <button
                      key={category}
                      onClick={() => setCurremtCategory(category)}
                      className={`flex items-center justify-between px-3 py-2 rounded text-xs transition-all ${
                        currentCategory === category 
                        ? 'text-black font-bold bg-gray-50 ring-1 ring-black/5' 
                        : 'text-gray-500 hover:text-black hover:bg-gray-50'
                      }`}
                    >
                      {/* 中文類別通常不需 capitalize，若資料為英文則保留 */}
                      <span>{category === 'all' ? '未分類' : category}</span>
                      {currentCategory === category && (
                        <div className="w-1 h-1 bg-black rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* --- 右側商品列表 --- */}
          <main className="flex-grow">
            <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-baseline gap-3">
                <h2 className="text-xl font-black text-gray-900 tracking-tight">
                  {currentCategory === 'all' ? '全部商品' : currentCategory}
                </h2>
              </div>
              <p className="text-[11px] text-gray-400 font-bold tracking-wider">
                共 {pagination.total_pages ? products.length : 0} 件商品
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 mb-12">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="group cursor-pointer flex flex-col"
                  onClick={(e) => handleViewDetail(e, product.id)}
                >
                  <div className="relative bg-gray-50 rounded-sm overflow-hidden">
                    <div className="h-44 md:h-52 overflow-hidden relative">
                      <img
                        src={product.imageUrl}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        alt={product.title}
                      />
                    </div>
                    {/* 快速檢視按鈕 */}
                    <div className="absolute inset-x-0 bottom-0 p-2 translate-y-full group-hover:translate-y-0 transition-all duration-300 bg-white/20 backdrop-blur-md">
                      <button className="w-full bg-black text-white py-2 rounded-sm text-[10px] font-bold tracking-widest">
                        查看商品
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-col flex-grow">
                    <h4 className="text-xs font-bold text-gray-800 line-clamp-1 group-hover:text-gray-500 transition-colors">
                      {product.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 line-clamp-1 mt-1 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-black text-gray-900 tracking-wider">
                        NT$ {product.price?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 分頁元件 */}
            <div className="flex justify-center mt-12 border-t border-gray-50 pt-8">
              <Pagination pagination={pagination} changePage={getProducts} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;