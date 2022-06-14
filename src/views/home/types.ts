export interface ICategory {
  category: string;
  children: string[];
  value: string;
}

export interface IGoodsRes {
  id: number;
  name: string;
  description: string;
  price: number;
  pics: string[];
  put: string;
  inventory: number;
  category_id: number;
  property: string;
}
