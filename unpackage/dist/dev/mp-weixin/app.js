"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/page2/page2.js";
  "./pages/talk/talk.js";
  "./pages/camera/camera.js";
}
const _sfc_main = {
  onLaunch: () => {
    console.log("App Launch");
    common_vendor.index.getSystemInfo({
      success: (res) => {
        globalThis.globalData.screenHeight = res.screenHeight - 44;
      }
    });
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/SignLangRecoUniapp/front_end/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
