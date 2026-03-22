import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

// 單一order
const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {},
    total: 0,
    user: {}
  },
  reducers: {
    updateOrder(state, action) {
      state.order = action.payload.order;
      state.total = action.payload.total;
      state.user = action.payload.user;
    },
  }
});

export const createAsyncGetOrder = createAsyncThunk(
  'order/createAsyncGetOrder',
  async (order_id, { dispatch }) => {
    try {
      const url = `${API_BASE}/api/${API_PATH}/order/${order_id}`;
      const response = await axios.get(url);
      dispatch(updateOrder(response.data));
    } catch (error) {
      console.error(error.response?.data?.message || "取得訂單失敗");
    }
  }
);

export const { updateOrder } = orderSlice.actions;

export default orderSlice.reducer;