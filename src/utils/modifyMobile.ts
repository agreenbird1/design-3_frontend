/**
 *
 * @param mobile - 手机号
 * @returns 形如 177****7777
 */
export const modifyMobile = (mobile: string): string => {
  return mobile.slice(0, 3) + "****" + mobile.slice(7);
};
