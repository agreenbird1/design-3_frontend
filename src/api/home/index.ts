import request from "../../utils/request";

/**
 *
 * @param keywords - 关键词
 * @returns 联想搜索
 */
export const getAssociateList = (keywords: string) => {
  return request("/product/associate", "get", { keywords });
};

export const getCategory = () => {
  return request("/category", "get");
};

export const getGoodsBySubcategory = (subcategory: string) => {
  return request("/product/subCategory", "get", { subcategory });
};

export const getGoodsBySubcategoryId = (subcategoryId: string) => {
  return request("/product/category/" + subcategoryId, "get");
};
