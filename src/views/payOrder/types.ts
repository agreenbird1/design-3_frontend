import type { IGoodsRes } from "../home/types";

export interface IOrderRes {
  id: number;
  createAt: string;
  state: string;
  number: string[];
  products: IGoodsRes[];
}
