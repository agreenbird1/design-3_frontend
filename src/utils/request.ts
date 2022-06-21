import axios from "axios";
import { useUserStore } from "@/stores/user";
import pinia from "@/stores";

const instance = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore(pinia);
    // 携带token
    if (userStore && userStore.token && config.headers)
      config.headers["Authorization"] = "Bearer " + userStore.token;
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
