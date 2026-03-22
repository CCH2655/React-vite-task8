import { api } from "./api";

export const postLogoutApi = () => {
  return api.post(
    '/logout'
  );
}