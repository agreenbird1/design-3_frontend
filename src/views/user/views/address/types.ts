export interface IAddress {
  value: string | null;
  detailAddress: string;
  reciver: string;
  mobile: string;
}

export interface IAddressT {
  value: string;
  label: string;
  children?: IAddressT[];
}
