import { api, API_PATH } from "./api";

export const postAddCartApi = ({
  id,
  qty,
}) => {
  const data = {
    product_id: id,
    qty,
  };

  return api.post( `/api/${API_PATH}/cart`, {data});
};

export const deleteDelSingleCartApi = ({
  id,
}) => {

  return api.delete( `/api/${API_PATH}/cart/${id}`);
};


export const putUpdateCartApi = ({
  id,
  product_id,
  qty,
}) => {
  const data = {
    product_id: product_id,
    qty,
  };

  return api.put( `/api/${API_PATH}/cart/${id}`, {data});
}