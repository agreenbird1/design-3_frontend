export interface IAddress {
  value: string;
  detailAddress: string;
  receiver: string;
  mobile: string;
  isDefault: string;
}

export interface IAddressT {
  value: string;
  label: string;
  children?: IAddressT[];
}

export interface IAddressRes extends IAddress {
  id: string;
}

export interface IAddressResponse {
  id: string;
  user_id: string;
  value: string;
  receiver: string;
  mobile: string;
  isDefault: string;
}
