import request from "../../utils/request";
import type { IUserLogin } from "./types";

/**
 * 采用用户名方式登陆
 * @param user - 用户名、密码
 * @returns 登陆后信息
 */
export const userLogin = (user: IUserLogin) => {
  return request("/user/login", "post", user);
};
