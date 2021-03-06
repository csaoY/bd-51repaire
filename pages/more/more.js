//logs.js
var util = require('../../utils/util.js')
const _ = require('../../utils/underscore');
const request = require('../../utils/request');
const urls = require('../../utils/urls');
var app = getApp()

Page({
  data: {
    userInfo: {}
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  makePhoneCall: function () {
    if (util.isRepeatClick()) return//判断是否为重复点击
    swan.makePhoneCall({
      phoneNumber: '4008625151' //打客服电话
    })
  },
  myorder: function () {
    
try {
    var result = swan.getStorageSync('phone');
    console.log(result)
} catch (e) {
}
    if(result){
      swan.navigateTo({
        url:'./myorder/myorder'
      })
      return;

    }
    //console.log(phone)
   
    console.log('hahahha')
   // if (util.isRepeatClick()) return//判断是否为重复点击
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      //if (!userInfo) {
        if(0){
        return
      } else {
        var openId = ""
        swan.login({
          success: function (res) {
            console.log('123',res)
            if (res.code) {
              //发起网络请求
              openId = res.code
              if (request.isLoading(that.addRQId)) return;
              const values = Object.assign({ channel: 7, content: JSON.stringify({ "openId": openId, "index": 0}) }, "")
              that.addRQId = request.get(urls.order_query, values, function (data) {
                console.log(data)
                if (data.result.code == 2000) {
                  swan.navigateTo({
                    url: 'myorder/myorder'
                  })
                } else if (data.result.code == 5018) {
                  swan.navigateTo({
                    url: '../login/login'
                  })
                }
                console.log("装载我的订单查询成功")
              }, that, { isShowLoading: false }
              );
            } else {
              swan.showToast({
                title: '需要允许微信授权才能继续使用',
                icon: 'success',
                duration: 2000
              })
              console.log('获取用户登录态失败！' + res.errMsg)
              return
            }
          }
        })
      }
    })
  }
})