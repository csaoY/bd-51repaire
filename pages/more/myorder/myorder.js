// pages/more/myorder/myorder.js

var util = require('../../../utils/util.js')
const _ = require('../../../utils/underscore');
const request = require('../../../utils/request');
const urls = require('../../../utils/urls');
const { timeUtil } = require('../../../utils/util');
import post from '../../../utils/new'
var app = getApp();

Page({
  data: {
    isOrderListEmpty:false,//列表为空
    orderList: []//订单列表
  },
  onUnload: function () {
    // 页面关闭
    try {
      swan.removeStorageSync('myOrderList')
    } catch (e) {
      // Do something when catch error
    }
  },
  onLoad: function (options) {
try {
    var result = swan.getStorageSync('phone');
    console.log(result)
} catch (e) {
}
    this.myorder(result)
  },
  myorder: function (phone) {
    const that=this;
    const obj=new Object();
    obj.content=JSON.stringify({
      'phone':phone,
      "index":'0'
    })
    post(urls.order_query,obj).then((res)=>{
     var myOrderList = res.data.orderList
                    var new_orderList = myOrderList.map(function (elem) {
                      elem.createTime = timeUtil.formatTime(new Date(elem.createTime)),
                        elem.state = deviceStateStr(elem.state, elem.orderType)
                      return elem
                    });
                    that.setData({
                      isOrderListEmpty: new_orderList.length == 0,
                      orderList: new_orderList
                    }); console.log(new_orderList)
    })
  },
  orderitem: function (e) {
    if (util.isRepeatClick()) return//判断是否为重复点
    var id = e.currentTarget.dataset.id;
    var ordertype = e.currentTarget.dataset.ordertype
    if (ordertype == '1') {//维修订单
      swan.navigateTo({
        url: '../orderitem/orderitem?orderId=' + id
      })
    } else if (ordertype == '2') {//售后订单
      swan.navigateTo({
        url: '../orderitem/orderitem?orderId=' + id
      })
    }else if (ordertype == '3') {//回收订单
      swan.navigateTo({
        url: '../orderitemre/orderitemre?orderId=' + id
      })
    }
  },
  send:function(e){
    var orderId = e.currentTarget.dataset.orderid;
    swan.navigateTo({
      url: '../send/send?orderId=' + orderId
    })
  }
})

function deviceStateStr(deviceState, ordertype) {
  var deviceStatStr = ""
  if (ordertype == '1') {//维修单
    switch (deviceState) {
      case -1:
        deviceStatStr = "已提交"
        break
      case 0:
        deviceStatStr = "已提交"
        break
      case 1:
        deviceStatStr = "已提交"
        break
      case 2:
        deviceStatStr = "已分派"
        break
      case 3:
        deviceStatStr = "修理中"
        break
      case 4:
        deviceStatStr = "已修理"
        break
      case 5:
        deviceStatStr = "已付款(已完成)"
        break
      case 6:
        deviceStatStr = "已取消"
        break
      case 7:
        deviceStatStr = "已完成"
        break
      default:
    }
  } else if (ordertype == '3') {//回收单
    switch (deviceState) {
      case -1:
        deviceStatStr = "等待中"
        break
      case 0:
        deviceStatStr = "等待中"
        break
      case 1:
        deviceStatStr = "等待中"
        break
      case 2:
        deviceStatStr = "等待中"
        break
      case 3:
        deviceStatStr = "等待中"
        break
      case 4:
        deviceStatStr = "已完成"
        break
      case 6:
        deviceStatStr = "已取消"
        break
      case 7:
        deviceStatStr = "已完成"
        break
      default:
    }
  }

  return deviceStatStr
}