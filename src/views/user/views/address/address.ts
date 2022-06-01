import { getAddresses as getAddressesApi } from "@/api";
import { modifyMobile } from "@/utils/modifyMobile";
import type {
  CascaderOption,
  DataTableColumns,
  FormItemRule,
  FormRules,
} from "naive-ui";
import { NButton, NCascader } from "naive-ui";
import { h, ref } from "vue";
import { options } from "./assets/addressInfo";
import type { IAddressRes, IAddressResponse } from "./types";

export const addresses = ref<IAddressRes[] | null>();

export const rules: FormRules = {
  receiver: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error("收货人不能为空");
      }
      return true;
    },
    trigger: ["input", "blur"],
  },
  detailAddress: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error("详细地址不能为空！");
      }
      return true;
    },
    trigger: ["input", "blur"],
  },
  mobile: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error("手机号不能为空！");
      } else if (!/^1[3|5|7|8][0-9]{9}$/.test(value)) {
        return new Error("手机号格式不正确！");
      }
      return true;
    },
    trigger: ["input", "blur"],
  },
  value: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error("详细地址不能为空！");
      }
      return true;
    },
    trigger: ["blur"],
  },
};

const createColumns = (
  play: (row: IAddressRes) => void
): DataTableColumns<IAddressRes> => [
  {
    title: "收货人",
    key: "receiver",
  },
  {
    title: "地区",
    key: "value",
    render(row) {
      return h(NCascader, {
        value: row.value,
        options: options as CascaderOption[],
        checkStrategy: "child",
      });
    },
  },
  {
    title: "详细地址",
    key: "detailAddress",
  },
  {
    title: "手机号",
    key: "mobile",
    render(row) {
      return modifyMobile(row.mobile);
    },
  },
  {
    title: "操作",
    key: "options",
    render(row) {
      return h("div", {}, [
        h(
          NButton,
          {
            strong: true,
            type: "info",
            tertiary: true,
            size: "small",
            style: {
              marginRight: "10px",
            },
            onClick: () => play(row),
          },
          { default: () => "编辑" }
        ),
        h(
          NButton,
          {
            strong: true,
            secondary: true,
            type: "error",
            size: "small",

            onClick: () => play(row),
          },
          { default: () => "删除" }
        ),
      ]);
    },
  },
  {
    title: "默认",
    key: "isDefault",
    render(row) {
      if (row.isDefault === "1") {
        return h("div", {}, [
          h(
            NButton,
            {
              strong: true,
              type: "warning",
              tertiary: true,
              size: "small",
            },
            { default: () => "默认地址" }
          ),
        ]);
      } else {
        return h("div", {}, [
          h(
            "div",
            {
              style: {
                color: "skyblue",
                cursor: "pointer",
                textDecoration: "underline",
              },
            },
            { default: () => "设为默认地址" }
          ),
        ]);
      }
    },
  },
];

export const columns = createColumns((row) => {
  console.log(row);
});

const getAddresses = async (): Promise<IAddressRes[]> => {
  const res = await getAddressesApi();
  return res.data.map((address: IAddressResponse) => {
    const v = address.value.split("|");
    return {
      id: address.id,
      receiver: address.receiver,
      mobile: address.mobile,
      isDefault: address.isDefault,
      value: v[0],
      detailAddress: v[1],
    };
  });
};

addresses.value = await getAddresses();
