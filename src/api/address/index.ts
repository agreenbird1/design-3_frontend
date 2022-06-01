import request from "../../utils/request";

export const getAddresses = () => {
  return request("/address", "get");
};
