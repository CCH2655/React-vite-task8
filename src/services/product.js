import { adminApi, api, API_PATH } from "./api";


export const getAllProductsApi = () => {
  return api.get( `/api/${API_PATH}/products`);
}

export const getProductsApi = (page = 1, category) => {
  return api.get( `/api/${API_PATH}/products`, {
    params: {
      page,
      category: category === 'all' ? null : category,
    }
  });
}

export const getProductApi = (id) => {
  return api.get(
    `/api/${API_PATH}/product/${id}`,
  );
}





export const getAdminProductsApi = (page = 1, category) => {
  return adminApi.get( `/api/${API_PATH}/admin/products`, {
    params: {
      page,
      category: category === 'all' ? null : category,
    }
  });
}
