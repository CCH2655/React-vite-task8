import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import useMessage from "../../hooks/useMessage";
import { useNavigate } from "react-router";
import { createAsyncDelAdminOrders, createAsyncGetAdminOrders } from "../../slice/ordersSlice";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

// --- 刪除確認 Modal ---
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, orderId }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">確認刪除訂單</h3>
        <p className="text-gray-500 mb-6">
          您確定要刪除這筆訂單嗎？<br />
          編號：<span className="font-mono font-bold text-red-600 break-all">{orderId}</span>
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors">取消</button>
          <button onClick={onConfirm} className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition-colors">確認刪除</button>
        </div>
      </div>
    </div>
  );
};

// --- 訂單細節 Modal ---
const OrderDetailModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;
  const productList = Object.values(order.products || {});

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-xl font-bold text-gray-800">訂單細節</h3>
            <span className="text-xs font-mono text-gray-400">ID: {order.id}</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <div className="p-6 space-y-8">
          <section>
            <h4 className="text-sm font-semibold text-blue-600 uppercase mb-3">客戶資訊</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div><span className="text-gray-500 text-sm">姓名：</span><p className="font-medium">{order.user?.name}</p></div>
              <div><span className="text-gray-500 text-sm">Email：</span><p className="font-medium">{order.user?.email}</p></div>
              <div><span className="text-gray-500 text-sm">電話：</span><p className="font-medium">{order.user?.tel}</p></div>
              <div><span className="text-gray-500 text-sm">地址：</span><p className="font-medium">{order.user?.address}</p></div>
            </div>
          </section>
          <section>
            <h4 className="text-sm font-semibold text-blue-600 uppercase mb-3">訂購商品</h4>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 text-xs">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-500">品名</th>
                    <th className="px-4 py-2 text-center text-gray-500">數量</th>
                    <th className="px-4 py-2 text-right text-gray-500">金額</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {productList.map((item, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 font-medium">{item.product?.title}</td>
                      <td className="px-4 py-3 text-center">{item.qty} / {item.product?.unit}</td>
                      <td className="px-4 py-3 text-right">${item.final_total?.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 font-bold text-sm">
                  <tr>
                    <td colSpan="2" className="px-4 py-3 text-right">總計金額</td>
                    <td className="px-4 py-3 text-right text-blue-600">${order.total?.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
        </div>
        <div className="p-6 border-t flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">關閉</button>
        </div>
      </div>
    </div>
  );
};

function AdminOrders() {
  const navigate = useNavigate();
  const { orders, pagination } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const { showSuccess, showError } = useMessage();

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const openView = (order) => { setCurrentOrder(order); setIsDetailOpen(true); };
  const openDelConfirm = (order) => { setCurrentOrder(order); setIsDelOpen(true); };

  const submitDelete = async () => {
    try {
      await dispatch(createAsyncDelAdminOrders(currentOrder.id)).unwrap();
      showSuccess("訂單已成功刪除");
      setIsDelOpen(false);
      dispatch(createAsyncGetAdminOrders(pagination.current_page || 1));
    } catch (err) { showError(err || "刪除失敗"); }
  };

  const checkAdmin = async () => {
    const token = document.cookie.split("; ").find((row) => row.startsWith("hexToken="))?.split("=")[1];
    if (token) axios.defaults.headers.common.Authorization = token;
    try {
      await axios.post(`${API_BASE}/api/user/check`);
    } catch (error) {
      console.log( error.response?.data?.message);
      navigate("/login");
    }
  };

  useEffect(() => { checkAdmin(); dispatch(createAsyncGetAdminOrders()); }, [dispatch]);

  return (
    <div className="container mx-auto mt-8 px-4 pb-12">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-600 pl-4">訂單管理系統</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 font-semibold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left">訂單編號</th>
                  <th className="px-6 py-3 text-left">下單時間</th>
                  <th className="px-6 py-3 text-left">客戶名稱</th>
                  <th className="px-6 py-3 text-left">總金額</th>
                  <th className="px-6 py-3 text-left">狀態</th>
                  <th className="px-6 py-3 text-left">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders?.map((order) => (
                  <tr key={order.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-3 font-mono text-xs text-gray-400">
                      {/* ...{order.id.substring(order.id.length - 8)} */}
                      {order.id}
                    </td>
                    <td className="px-6 py-3 text-gray-600">
                      {new Date(order.create_at * 1000).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 font-medium text-gray-800">{order.user?.name}</td>
                    <td className="px-6 py-3 text-gray-700">${order.total?.toLocaleString()}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${order.is_paid ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                        {order.is_paid ? "已付款" : "待付款"}
                      </span>
                    </td>
                    <td className="px-6 py-3 space-x-2">
                      <button className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded shadow-sm text-xs" onClick={() => openView(order)}>查看</button>
                      <button className="text-red-600 border border-red-200 hover:bg-red-50 px-3 py-1 rounded text-xs" onClick={() => openDelConfirm(order)}>刪除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex justify-center">
            <Pagination pagination={pagination} changePage={(page) => dispatch(createAsyncGetAdminOrders(page))} />
          </div>
        </div>
      </div>

      <OrderDetailModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} order={currentOrder} />
      <DeleteConfirmModal isOpen={isDelOpen} onClose={() => setIsDelOpen(false)} onConfirm={submitDelete} orderId={currentOrder?.id} />
    </div>
  );
}

export default AdminOrders;