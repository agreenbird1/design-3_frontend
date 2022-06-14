import axios from "axios";

export {
  addAddress,
  deleteAddress,
  getAddresses,
  updateAddresses,
} from "./address";
export { register, update_avatar, update_user, userLogin } from "./user";

export { getAssociateList, getCategory } from "./home";

export const sendCode = (mobile: string, code: string) => {
  return axios.get("/code", {
    params: {
      method: "Submit",
      account: "C92084107",
      password: "76cb8e561f8da8373394d5271f9a2fc6",
      content: `您的验证码是：${code}。请不要把验证码泄露给其他人。`,
      mobile,
    },
  });
};

export { getRecommendGoods, getHotGoods, getGoods } from "./goods";
