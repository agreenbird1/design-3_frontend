import cache from "@/utils/cache";
import axios from "axios";
import type { IUserInfo } from "./types";

const instance = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const user = cache.getCache("user") as IUserInfo;
    // 携带token
    if (user.token && config.headers)
      config.headers["Authorization"] = "Bearer " + user.token;
    return config;
  },
  (errors) => {
    return Promise.reject(errors);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (errors) => {
    // 返回信息，通过status判断
    return errors.response;
  }
);

export default (url: string, method: string, reqData?: unknown) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === "get" ? "params" : "data"]: reqData,
  });
};
