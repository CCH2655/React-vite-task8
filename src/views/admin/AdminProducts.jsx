import { useCallback, useEffect, useRef, useState } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import Pagination from "../../components/Pagination";
import ProductModal from "../../components/ProductModal";
import { RotatingLines } from "react-loader-spinner";

// API 設定
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const INITIAL_TEMPLATE_DATA = {
  id: "",
  title: "",
  category: "",
  origin_price: "",
  price: "",
  unit: "",
  description: "",
  content: "",
  imageUrl: "",
  imagesUrl: [],
  is_enabled: false,
  is_delivery: false,
};

function AdminProducts() {
  const productModalRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [templateData, setTemplateData] = useState(INITIAL_TEMPLATE_DATA);
  const [modalType, setModalType] = useState("");
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE}/api/${API_PATH}/admin/products?page=${page}`,
      );
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error) {
      // 確保 error.response 存在再讀取 message
      console.log(error.response?.data?.message || "取得產品失敗");
    } finally {
      // 3. 結束抓取，給予微小延遲增加平滑感
      setTimeout(() => setIsLoading(false), 100);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getProducts();
    };
    fetchData();
  }, [getProducts]);

  useEffect(() => {
    const modalElement = document.querySelector("#productModal");

    // 檢查元素是否存在，避免在測試環境出錯
    if (modalElement) {
      productModalRef.current = new bootstrap.Modal(modalElement, {
        keyboard: false,
      });

      const handleHide = () => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      };

      modalElement.addEventListener("hide.bs.modal", handleHide);

      // 組件卸載時務必移除監聽器，防止記憶體洩漏
      return () => {
        modalElement.removeEventListener("hide.bs.modal", handleHide);
      };
    }
  }, []);

  const openModal = (product, type) => {
    setTemplateData({
      ...INITIAL_TEMPLATE_DATA,
      ...product,
    });
    setModalType(type);
    productModalRef.current.show();
  };
  const closeModal = () => {
    productModalRef.current.hide();
  };

  // useEffect(() => {
  //   // 初始化 Bootstrap Modal
  //   productModalRef.current = new bootstrap.Modal("#productModal", {
  //     keyboard: false,
  //   });

  //   // Modal 關閉時移除焦點
  //   document
  //     .querySelector("#productModal")
  //     .addEventListener("hide.bs.modal", () => {
  //       if (document.activeElement instanceof HTMLElement) {
  //         document.activeElement.blur();
  //       }
  //     });
  // }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="card">
          <div className="card p-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2>商品管理</h2>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => openModal(INITIAL_TEMPLATE_DATA, "create")}
              >
                建立新的商品
              </button>
            </div>

            {isLoading ? (
              <div className="d-flex flex-column justify-content-center align-items-center py-5 my-5">
                <RotatingLines
                  strokeColor="#0d6efd" // 使用 Bootstrap Primary Blue
                  strokeWidth="3"
                  animationDuration="0.75"
                  width="50"
                  visible={true}
                />
                <p className="mt-3 text-muted small fw-bold tracking-wider">
                  正在讀取商品清單...
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>分類</th>
                      <th>產品名稱</th>
                      <th className="text-end">原價</th>
                      <th className="text-end">售價</th>
                      <th className="text-center">可否宅配</th>
                      <th className="text-center">是否啟用</th>
                      <th className="text-center">編輯</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((product, index) => (
                        <tr key={index}>
                          <td>
                            <span className="badge bg-secondary opacity-75">
                              {product.category}
                            </span>
                          </td>
                          <td className="fw-medium">{product.title}</td>
                          <td className="text-end text-muted">
                            <del>{product.origin_price}</del>
                          </td>
                          <td className="text-end fw-bold">{product.price}</td>
                          <td className="text-center">
                            <span
                              className={`${product.is_delivery ? "text-success" : "text-danger"}`}
                            >
                              {product.is_delivery ? "●" : "○"}{" "}
                              {product.is_delivery ? "可宅配" : "無宅配"}
                            </span>
                          </td>
                          <td className="text-center">
                            <span
                              className={`${product.is_enabled ? "text-success" : "text-danger"}`}
                            >
                              {product.is_enabled ? "啟用" : "未啟用"}
                            </span>
                          </td>
                          <td className="text-center">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => openModal(product, "edit")}
                              >
                                編輯
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => openModal(product, "delete")}
                              >
                                刪除
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center py-5 text-muted italic"
                        >
                          目前倉庫中沒有商品資料
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* 分頁元件搬到 table 下方 */}
                <div className="d-flex justify-content-center mt-4">
                  <Pagination
                    pagination={pagination}
                    changePage={getProducts}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ProductModal
        modalType={modalType}
        templateProduct={templateData}
        getProducts={getProducts}
        closeModal={closeModal}
      />
    </>
  );
}

export default AdminProducts;
