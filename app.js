//app.js
//HotApp微信小程计接入只需要在小程序的入口文件app.js中引入一行代码:
// var hotapp = require('utils/hotapp.js');
//hotapp.setDebug(true); // 显示调试信息开关
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = swan.getStorageSync('logs') || []
    logs.unshift(Date.now())
    swan.setStorageSync('logs', logs)
    // hotapp.init("hotapp171640993")
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      console.log(1)
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
       console.log(2)
      //调用登录接口
      swan.login({
        success: function (res) {
          if (res.code) {
            console.log(res.code)
           that.authModal(cb);
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
          
        }
      })
    }
  },
  authModal: function (cb) {
    console.log(3);
    const that = this;
      console.log( that.globalData.userInfo)
    swan.authorize({
     scope: 'scope.userInfo',
     success: function (res) {
       console.log(res)
    // 用户已经同意智能小程序使用定位功能
        swan.getUserInfo({
      success: function (res) {
        console.log(res);
        that.globalData.userInfo = res.userInfo;
        console.log( that.globalData.userInfo)
        typeof cb == "function" && cb(that.globalData.userInfo)
      },
      fail: function () {
        swan.showModal({
          title: '警告',
          content: '若不授权微信登陆，则无法使用51修部分功能，点击重新获取授权，则可重新使用；',
          confirmText: "授权",
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击授权')
              swan.openSetting({
                success: function (res) {
                  console.log(res)
                  if (!res.authSetting["scope.userInfo"]) {
                    //that.authModal(cb)
                    console.log('用户没有授权。。！');
                  } else {
                    that.authModal(cb)
                  }
                }, fail: function (res) {
                  that.authModal(cb)
                  console.log('用户没有授权。。！')
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }//end fail
    })
  },fail:(res)=>{
    console.log(res);
     swan.getUserInfo({
      success: function (res) {
        console.log(res);
        that.globalData.userInfo = res.userInfo;
        console.log( that.globalData.userInfo);
        typeof cb == "function" && cb(that.globalData.userInfo)
      }})
  }
});

  },
  onError: function (msg) {
    //错误日志上传
    // hotapp.onError(msg,"1.0.2",function (err) {
    //   console.log(err)
    // })
  },
  globalData: {
    userInfo: null
  }
})

// {
//   "pagePath": "pages/recycling/recycling",
//   "text": "回收",
//   "iconPath": "images/recycle.png",
//   "selectedIconPath": "images/recycle_focus.png"
// }