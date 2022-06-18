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
