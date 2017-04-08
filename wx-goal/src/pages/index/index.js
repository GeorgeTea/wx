const CONST = require('../../utils/const');
const CACHE_KEY = CONST.CACHE_KEY;

//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        motto: '加载中...',
    },
    onLoad: function() {
        console.log('index onLoad')
        // 登陆
        app.getUserInfo();

        // 页面路由
        var goal = wx.getStorageSync(CACHE_KEY.GOAL);
        if(!goal){
            wx.redirectTo({
                url: '../goal/goal'
            })
        } else {
            wx.redirectTo({
                url: '../achive/achive'
            })
        }
    }
})