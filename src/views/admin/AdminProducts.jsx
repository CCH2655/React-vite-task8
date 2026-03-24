import { useEffect, useRef, useState } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import Pagination from "../../components/Pagination";
import ProductModal from "../../components/ProductModal";
import useMessage from "../../hooks/useMessage";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const productModalRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [templateData, setTemplateData] = useState(INITIAL_TEMPLATE_DATA);
  const [modalType, setModalType] = useState("");
  const [pagination, setPagination] = useState({});
  const { showError } = useMessage();

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

  

  useEffect(() => {
    // 1. 初始化外部套件 (非 React 管理的 DOM)
    const modalElement = document.querySelector("#productModal");
    if (modalElement) {
      productModalRef.current = new bootstrap.Modal(modalElement, {
        keyboard: false,
      });
  
      const hideHandler = () => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      };
  
      modalElement.addEventListener("hide.bs.modal", hideHandler);

      return () => {
        modalElement.removeEventListener("hide.bs.modal", hideHandler);
      };
    }
  }, []);
  
  

  const getProducts = async (page = 1) => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/${API_PATH}/admin/products?page=${page}`,
      );

      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error) {
      showError(error.response.data.message);
    }
  };

  useEffect(() => {
    const checkAdmin = async () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("hexToken="))
        ?.split("=")[1];
  
      if (token) {
        axios.defaults.headers.common.Authorization = token;
      }
      
      try {
        await axios.post(`${API_BASE}/api/user/check`);
      } catch (error) {
        console.log( error.response?.data?.message);
        navigate("/login");
      }
    };

    checkAdmin();

    const getFisrtProducts = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/api/${API_PATH}/admin/products`,
        );
  
        setProducts(response.data.products);
        setPagination(response.data.pagination);
      } catch (error) {
        showError(error.response.data.message);
      }
    };
    getFisrtProducts();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="card">
          <div className="card p-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2>商品管理</h2>
              
              <div className="d-flex justify-content-between gap-4">
                {/* <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => logout()}
                >
                  登出
                </button> */}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => openModal(INITIAL_TEMPLATE_DATA, "create")}
                >
                  建立新的商品
                </button>
              </div>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center">
              <table className="table">
                <thead>
                  <tr>
                    <th>分類</th>
                    <th>產品名稱</th>
                    <th>原價</th>
                    <th>售價</th>
                    <th>可否宅配</th>
                    <th>是否啟用</th>
                    <th>編輯</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.category}</td>
                      <td>{product.title}</td>
                      <td>{product.origin_price}</td>
                      <td>{product.price}</td>
                      <td>
                        <span className={`${product.is_delivery ? 'text-success' : 'text-danger'}`}>
                          {product.is_delivery ? '可宅配' : '無宅配'}
                        </span>
                      </td>
                      <td>
                        <span className={`${product.is_enabled ? 'text-success' : 'text-danger'}`}>
                          {product.is_enabled ? '啟用' : '未啟用'}
                        </span>
                      </td>
                      <td>
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
                  ))}
                </tbody>
              </table>

              <Pagination pagination={pagination} changePage={getProducts} />
            </div>
            
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
  )
}

export default AdminProducts