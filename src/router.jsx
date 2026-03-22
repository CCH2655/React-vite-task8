// src/router.jsx
import { createHashRouter } from "react-router";
import FrontendLayout from "./layout/FrontendLayout";
import Home from "./views/frontend/Home";
import Products from "./views/frontend/Products";
import SingleProduct from "./views/frontend/SingleProduct";
import Cart from "./views/frontend/Cart";
import Checkout from "./views/frontend/Checkout";
import CheckoutSuccess from "./views/frontend/CheckoutSuccess";
import Login from "./views/Login";

import AdminLayout from "./layout/AdminLayout";
import AdminProducts from "./views/admin/AdminProducts";
import AdminOrders from "./views/admin/AdminOrders";
import ProtectedRoute from "./components/ProtectedRoute";

import NotFound from "./views/frontend/NotFound";

export const router = createHashRouter([
  {
    path: "/",
    element: <FrontendLayout />,
    children: [
      {
        index: true, // 預設首頁
        element: <Home />,
      },
      {
        path: 'product',
        element: <Products/>
      },
      {
        path: 'product/:id',
        element: <SingleProduct/>
      },
      {
        path: 'cart',
        element: <Cart/>
      },
      {
        path: 'checkout',
        element: <Checkout/>
      },
      {
        path: 'checkout-success',
        element: <CheckoutSuccess/>
      },
      {
        path: 'checkout-success',
        element: <CheckoutSuccess/>
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "product",
        element: <AdminProducts />,
      },
      {
        path: "order",
        element: <AdminOrders />,
      },
    ],
  },
  {
    path: "*", // 404 頁面
    element: <NotFound />,
  },
]);
