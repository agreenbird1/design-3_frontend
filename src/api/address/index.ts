import type { IAddress, IAddressRes } from "@/views/user/views/address/types";
import request from "../../utils/request";

export const getAddresses = () => {
  return request("/address", "get");
};

export const updateAddresses = (address: IAddressRes) => {
  return request("/address", "patch", address);
};

export const addAddress = (address: IAddress) => {
  return request("/address", "post", address);
};

export const deleteAddress = (id: string) => {
  return request("/address", "delete", { id });
};
