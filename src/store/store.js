import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "../slice/messageSlice";
import cartReducer from "../slice/cartSlice";
import ordersReducer from "../slice/ordersSlice";
import orderReducer from "../slice/orderSlice";

export const store = configureStore({
  reducer: {
    message: messageReducer,
    cart: cartReducer,
    orders: ordersReducer,
    order: orderReducer,
  },
});

export default store;
