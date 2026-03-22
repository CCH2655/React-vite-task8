import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { postAddCartApi } from "../services/cart";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    total: 0,
    final_total: 0,
  }, 
  // action
  reducers: {
    updateCart(state, action) {
      state.carts = action.payload.carts;
      state.total = action.payload.total;
      state.final_total = action.payload.final_total;
    }
  }
    
});

export const createAsyncGetCart = createAsyncThunk(
  'cart/createAsyncGetCart',
  async (_, { dispatch }) => {
    try {
      const url = `${API_BASE}/api/${API_PATH}/cart`;
      const response = await axios.get(url);
      dispatch(updateCart(response.data.data));
    } catch (error) {
      // console.log(error.response.data);
    }
  }
);

export const createAsyncAddCart = createAsyncThunk(
  'cart/createAsyncAddCart',
  async ({id, qty = 1}, { dispatch }) => {
    try {
      const response = await postAddCartApi({id, qty});
      dispatch(createAsyncGetCart());
    } catch (error) {
      // console.log(error.response.data);
    }
  }
);

export const createAsyncDelCart = createAsyncThunk(
  'cart/createAsyncDelCart',
  async ( id, { dispatch }) => {
    try {
      const url = `${API_BASE}/api/${API_PATH}/cart/${id}`
      const response = await axios.delete(url);
      dispatch(createAsyncGetCart());
    } catch (error) {
      // console.log(error.response.data);
    }
  }
);

export const { updateCart } = cartSlice.actions;

export default cartSlice.reducer;
