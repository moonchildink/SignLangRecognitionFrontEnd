"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  onPullDownRefresh: () => {
    common_vendor.index.stopPullDownRefresh();
    common_vendor.index.showToast({
      title: "信息刷新成功!"
    });
  },
  data() {
    return {};
  },
  methods: {
    callHelp: () => {
      console.log("唤起帮助");
    },
    callRecognition: () => {
      console.log("唤起手语识别");
      common_vendor.index.navigateTo({
        url: "/pages/camera/camera",
        success: () => {
          console.log("跳转到手语界面");
        },
        fail: (err) => {
          console.log("跳转失败！");
          common_vendor.index.showToast({
            icon: "error",
            title: "跳转失败，请稍后尝试。"
          });
        }
      });
    },
    callKeyboard: function() {
      common_vendor.index.navigateTo({
        url: "/pages/talk/talk",
        success: () => {
          console.log("跳转到聊天界面");
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "跳转失败，请稍后重试！"
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.callHelp && $options.callHelp(...args)),
    b: common_vendor.o((...args) => $options.callRecognition && $options.callRecognition(...args)),
    c: common_vendor.o((...args) => $options.callKeyboard && $options.callKeyboard(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/SignLangRecoUniapp/front_end/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
