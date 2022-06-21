import request from "../../utils/request";

export const addOrder = (product_ids: number[], number: number[]) => {
  return request("/order", "post", { product_ids, number });
};

export const getOrder = (order_id?: string) => {
  return request("/order", "get", { order_id });
};

export const updateOrder = (address_id: string, order_id: number) => {
  return request("/order", "patch", { address_id, order_id });
};
