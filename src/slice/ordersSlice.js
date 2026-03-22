import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

// 全部orders列表
const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    pagination: {},
    messages: [],
  },
  reducers: {
    updateOrders(state, action) {
      state.orders = action.payload.orders;
      state.pagination = action.payload.pagination;
    },
  }
});

export const createAsyncGetOrders = createAsyncThunk(
  'order/createAsyncGetOrders',
  async (page = 1, { dispatch }) => {
    try {
      const url = `${API_BASE}/api/${API_PATH}/orders?page=${page}`;
      const response = await axios.get(url);
      dispatch(updateOrders(response.data));
    } catch (error) {
      console.error(error.response?.data?.message || "取得訂單失敗");
    }
  }
);


// admin orders
export const createAsyncGetAdminOrders = createAsyncThunk(
  'order/createAsyncGetAdminOrders',
  async (page = 1, { dispatch }) => {
    try {
      const url = `${API_BASE}/api/${API_PATH}/admin/orders?page=${page}`;
      const response = await axios.get(url);
      dispatch(updateOrders(response.data));
    } catch (error) {
      console.error(error.response?.data?.message || "取得訂單失敗");
    }
  }
);

export const createAsyncDelAdminOrders = createAsyncThunk(
  'order/createAsyncDelAdminOrders',
  async (id, { dispatch }) => {
    try {
      const url = `${API_BASE}/api/${API_PATH}/admin/order/${id}`;
      const response = await axios.delete(url);
      dispatch(createAsyncGetOrders());
    } catch (error) {
      console.error(error.response?.data?.message || "取得訂單失敗");
    }
  }
);

export const { updateOrders } = ordersSlice.actions;

export default ordersSlice.reducer;