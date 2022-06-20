import axios from "axios";

export * from "./address";
export * from "./user";

export * from "./home";

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

export * from "./goods";
