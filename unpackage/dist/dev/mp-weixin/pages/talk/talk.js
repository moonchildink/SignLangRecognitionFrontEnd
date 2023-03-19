"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      talkList: [],
      ajax: {
        rows: 20,
        //每页数量
        page: 1,
        //页码
        flag: true,
        // 请求开关
        loading: true,
        // 加载中
        loadText: "正在获取消息"
      },
      content: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getHistoryMsg();
    });
  },
  onPageScroll(e) {
    if (e.scrollTop < 5) {
      this.getHistoryMsg();
    }
  },
  methods: {
    //这部分代码测试用,另外对于点击播放语音这一部分还需要添加防抖，避免用户高频点击造成循环调用
    testFunc: (event) => {
      if (event) {
        let id = event.currentTarget.id;
        console.log(id);
        let text = document.getElementById(id).textContent;
        console.log(text);
        let audioPlayer = common_vendor.index.createInnerAudioContext();
        audioPlayer.autoplay = true;
        audioPlayer.src = "https://api.vvhan.com/api/song?txt=" + text;
        audioPlayer.onPlay(() => {
          console.log("开始播放");
          common_vendor.index.showToast({
            title: "播放语音中！欢迎使用本产品。",
            mask: true
          });
        });
        audioPlayer.onError((res) => {
          console.log(res.errMsg);
          console.log(res.errCode);
          common_vendor.index.showToast({
            title: "播放失败，请稍后再试！",
            icon: "error"
          });
        });
      }
    },
    getHistoryMsg() {
      if (!this.ajax.flag) {
        return;
      }
      let get = async () => {
        this.hideLoadTips();
        this.ajax.flag = false;
        let data = await this.joinHistoryMsg();
        console.log("----- 模拟数据格式，供参考 -----");
        console.log(data);
        let selector = "";
        if (this.ajax.page > 1) {
          selector = `#msg-${this.talkList[0].id}`;
        } else {
          selector = `#msg-${data[data.length - 1].id}`;
        }
        this.talkList = [...data, ...this.talkList];
        this.$nextTick(() => {
          this.setPageScrollTo(selector);
          this.hideLoadTips(true);
          if (data.length < this.ajax.rows)
            ;
          else {
            this.ajax.page++;
            setTimeout(() => {
              this.ajax.flag = true;
            }, 200);
          }
        });
      };
      get();
    },
    // 拼接历史记录消息，正式项目可替换为请求历史记录接口
    joinHistoryMsg() {
      let join = () => {
        let arr = [];
        let startIndex = (this.ajax.page - 1) * this.ajax.rows;
        let endIndex = startIndex + this.ajax.rows;
        for (let i = startIndex; i < endIndex; i++) {
          arr.push({
            "id": i,
            // 消息的ID
            "content": `这是历史记录的第${i + 1}条消息`,
            // 消息内容
            "type": Math.random() > 0.5 ? 1 : 0,
            // 此为消息类别，设 1 为发出去的消息，0 为收到对方的消息,
            "pic": "/static/headerr.jpg"
            // 头像
          });
        }
        arr.reverse();
        return arr;
      };
      return new Promise((done, fail) => {
        setTimeout(() => {
          let data = join();
          done(data);
        }, 1500);
      });
    },
    // 设置页面滚动位置
    setPageScrollTo(selector) {
      let view = common_vendor.index.createSelectorQuery().in(this).select(selector);
      view.boundingClientRect((res) => {
        common_vendor.index.pageScrollTo({
          scrollTop: res.top - 30,
          // -30 为多显示出大半个消息的高度，示意上面还有信息。
          duration: 0
        });
      }).exec();
    },
    // 隐藏加载提示
    hideLoadTips(flag) {
      if (flag) {
        this.ajax.loadText = "消息获取成功";
        setTimeout(() => {
          this.ajax.loading = false;
        }, 300);
      } else {
        this.ajax.loading = true;
        this.ajax.loadText = "正在获取消息";
      }
    },
    // 发送信息
    send() {
      if (!this.content) {
        common_vendor.index.showToast({
          title: "请输入有效的内容",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "正在发送"
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        let data = {
          "id": new Date().getTime(),
          "content": this.content,
          "type": 1,
          "pic": "/static/headerr.jpg"
        };
        this.talkList.push(data);
        this.$nextTick(() => {
          this.content = "";
          common_vendor.index.pageScrollTo({
            scrollTop: 999999,
            // 设置一个超大值，以保证滚动条滚动到底部
            duration: 0
          });
        });
      }, 1500);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.ajax.loadText),
    b: $data.ajax.loading ? 1 : "",
    c: common_vendor.o((...args) => $options.getHistoryMsg && $options.getHistoryMsg(...args)),
    d: common_vendor.f($data.talkList, (item, index, i0) => {
      return {
        a: item.pic,
        b: common_vendor.t(item.content),
        c: common_vendor.n(item.type == 1 ? "push" : "pull"),
        d: item.id,
        e: "msg-" + item.id,
        f: common_vendor.o((...args) => $options.testFunc && $options.testFunc(...args), item.id),
        g: "msg-" + item.id
      };
    }),
    e: $data.content,
    f: common_vendor.o(($event) => $data.content = $event.detail.value),
    g: common_vendor.o((...args) => $options.send && $options.send(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/SignLangRecoUniapp/front_end/pages/talk/talk.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
