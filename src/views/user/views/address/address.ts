import {
  addAddress,
  deleteAddress,
  getAddresses as getAddressesApi,
  updateAddresses,
} from "@/api";
import { modifyMobile } from "@/utils/modifyMobile";
import type {
  CascaderOption,
  DataTableColumns,
  FormInst,
  FormItemRule,
  FormRules,
} from "naive-ui";
import { NButton, NCascader } from "naive-ui";
import { h, ref } from "vue";
import { options } from "./assets/addressInfo";
import type { IAddress, IAddressRes, IAddressResponse } from "./types";

let rowId = "";
export const addresses = ref<IAddressRes[] | null>(null);

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
        return new Error("地区不能为空！");
      }
      return true;
    },
    trigger: ["blur"],
  },
};

export const isUpdated = ref(false);
export const isOpenPanel = ref(false);
export const formRef = ref<FormInst | null>(null);

export const formValue = ref<IAddress>({
  detailAddress: "",
  value: "",
  receiver: "",
  mobile: "",
  isDefault: "0",
});

const createColumns = (): DataTableColumns<IAddressRes> => [
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
        onUpdateValue: (value) => {
          row.value = value;
          // 更改时候直接更新数据库
          updateAddresses(row);
        },
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
            onClick: () => {
              isOpenPanel.value = true;
              isUpdated.value = true;
              formValue.value = { ...row };
              rowId = row.id;
            },
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

            onClick: () => {
              deleteAddress(row.id);
              addresses.value?.forEach((address, idx) => {
                if (address.id === row.id) {
                  addresses.value?.splice(idx, 1);
                }
              });
            },
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
              onClick: () => {
                row.isDefault = "1";
                formValue.value = { ...row };
                rowId = row.id;
                isUpdated.value = true;
                upAddress();
              },
            },
            { default: () => "设为默认地址" }
          ),
        ]);
      }
    },
  },
];

export const columns = createColumns();

const getAddresses = async (): Promise<IAddressRes[]> => {
  const res = await getAddressesApi();
  let defaultIdx = 0;
  res.data = res.data.map((address: IAddressResponse, index: number) => {
    if (address.isDefault === "1") {
      defaultIdx = index;
    }
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

  defaultIdx && res.data.unshift(res.data.splice(defaultIdx, 1)[0]);

  return res.data;
};

export const upAddress = () => {
  if (isUpdated.value) {
    updateAddresses({
      id: rowId,
      ...formValue.value,
    });
    if (formValue.value.isDefault === "1" && addresses.value) {
      let defaultAd;
      addresses.value.forEach((address, idx) => {
        if (address.id !== rowId) address.isDefault = "0";
        else {
          address.isDefault = "1";
          defaultAd = address;
          addresses.value?.splice(idx, 1);
          addresses.value?.unshift(defaultAd);
        }
      });
    }
  } else {
    addAddress(formValue.value).then((res) => {
      // 始终保持默认地址在第一个
      if (formValue.value.isDefault === "1" && addresses.value) {
        addresses.value[0].isDefault = "0";
        addresses.value?.unshift({
          id: res.data,
          ...formValue.value,
        });
      } else {
        addresses.value?.push({
          id: res.data,
          ...formValue.value,
        });
      }
    });
  }
  isOpenPanel.value = false;
};

export const resetForm = () => {
  formValue.value = {
    detailAddress: "",
    value: "",
    receiver: "",
    mobile: "",
    isDefault: "0",
  };
};

addresses.value = await getAddresses();
