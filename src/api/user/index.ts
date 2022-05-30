import request from "../../utils/request";
import type { IUserLogin, IUserRegister } from "./types";

/**
 * 采用用户名方式登陆
 * @param user - 用户名、密码
 * @returns 登陆后信息
 */
export const userLogin = (user: IUserLogin) => {
  return request("/user/login", "post", user);
};

/**
 *
 * @param user - 注册用户。包括名、密码、手机、性别
 * @returns
 */
export const register = (user: IUserRegister) => {
  return request("/user", "post", user);
};
