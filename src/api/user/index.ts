import request from "../../utils/request";
import type { IUserLogin, IUserRegister, IUserUpdate } from "./types";

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

/**
 *
 * @param avatar - 图片文件
 * @returns 图片路径
 */
export const update_avatar = (avatar: FormData) => {
  return request("/upload/avatar", "post", avatar);
};

/**
 *
 * @param user - 用户名、性别
 * @returns
 */
export const update_user = (user: IUserUpdate) => {
  return request("/user/update", "post", user);
};

export const getCart = () => {
  return request("/cart", "get");
};

export const deleteCart = (product_id: number) => {
  return request("/cart", "delete", { product_id });
};
