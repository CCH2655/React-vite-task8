import { adminApi, api, API_PATH } from "./api";

export const postAddCartApi = ({
  id,
  qty,
}) => {
  const data = {
    product_id: id,
    qty,
  };
  
  return api.post( `/api/${API_PATH}/cart`, {data});
}