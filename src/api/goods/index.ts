import request from "../../utils/request";

export const getHotGoods = () => {
  return request("/product/hot", "get");
};

export const getRecommendGoods = () => {
  return request("/product/recommend", "get");
};

export const getGoods = () => {
  return request("/product", "get");
};

export const getGoodsById = (id: string) => {
  return request("/product/apro", "get", { id });
};

export const getCollection = () => {
  return request("/collection", "get");
};

export const collectGoods = (product_id: number) => {
  return request("/collection", "post", { product_id });
};

export const deleteCollection = (product_id: number) => {
  return request("/collection", "delete", { product_id });
};

export const addCart = (product_id: number, number: number) => {
  return request("/cart", "post", { product_id, number });
};
