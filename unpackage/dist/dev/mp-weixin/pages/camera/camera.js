"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      showTypes: 1,
      devicePosition: "front",
      cameraIsWorking: 0,
      dataBuffer: null
    };
  },
  methods: {
    cameraStopHandler: (err) => {
      console.log(err);
      common_vendor.index.showToast({
        title: "拍摄结束"
      });
    },
    cameraErrHandler: (err) => {
      common_vendor.index.showToast({
        title: "调用摄像头失败！请开启权限！",
        icon: "error"
      });
      console.log(err.detail);
      common_vendor.index.redirectTo({
        // console.log("返回首页")
      });
    },
    cameraChange: () => {
      if (globalThis.devicePosition === "front") {
        globalThis.devicePosition = "back";
      } else {
        globalThis.devicePosition = "front";
      }
    },
    cameraStart() {
      const camera = common_vendor.index.createCameraContext();
      console.log(camera);
      camera.startRecord({
        // 对于微信以及APP端似乎有不同的时长限制，此处应该使用#ifdefine语句
        timeout: 3e5,
        success: (res2) => {
          console.log(res2);
        },
        timeoutCallback: (err) => {
          console.log(res.detail);
          common_vendor.index.showToast({
            icon: "error",
            title: "超过最大录制时长，请重新开始录制"
          });
        }
      });
    },
    error: (err) => {
      console.log(err.detail);
    },
    dataToNumjsArray: (arrayBuffer) => {
    },
    getHolistic: (data) => {
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.devicePosition,
    b: common_vendor.o((...args) => $options.cameraStopHandler && $options.cameraStopHandler(...args)),
    c: common_vendor.o((...args) => $options.cameraErrHandler && $options.cameraErrHandler(...args)),
    d: common_vendor.o((...args) => $options.cameraChange && $options.cameraChange(...args)),
    e: common_vendor.o((...args) => $options.cameraStart && $options.cameraStart(...args)),
    f: common_vendor.o((...args) => _ctx.cameraChangeToType && _ctx.cameraChangeToType(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/SignLangRecoUniapp/front_end/pages/camera/camera.vue"]]);
wx.createPage(MiniProgramPage);
