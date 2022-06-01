export interface IAddress {
  value: string | null;
  detailAddress: string;
  receiver: string;
  mobile: string;
}

export interface IAddressT {
  value: string;
  label: string;
  children?: IAddressT[];
}

export interface IAddressRes {
  id: string;
  value: string;
  detailAddress: string;
  receiver: string;
  mobile: string;
  isDefault: string;
}

export interface IAddressResponse {
  id: string;
  user_id: string;
  value: string;
  receiver: string;
  mobile: string;
  isDefault: string;
}
