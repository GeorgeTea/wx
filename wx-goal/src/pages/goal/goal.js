const CONST = require('../../utils/const');
const CACHE_KEY = CONST.CACHE_KEY;
var util = require('../../utils/util');

//获取应用实例
var app = getApp()
Page({
    data: {
        userInfo: {},
        appIntro: '坚持21天，可养成新的习惯',
        newGoalIntro: '请输入您的目标',
        newGoalBtnInfo: {},
        newGoalName: '',
    },

    // 绑定‘新目标’输入框
    bindNewGoalInput: function(e) {
        this.setData({ newGoalName: e.detail.value });
        var newGoalBtnInfo = this.data.newGoalName.trim().length > 0 ?
            util.genBtnInfo({
                btnType: 'primary',
                text: '制定目标',
                handler: 'bindNewGoalBtnTap'
            }) : util.genBtnInfo({
                btnType: 'default',
                text: '制定目标',
                handler: 'bindNewGoalBtnTap'
            });
        this.setData({ newGoalBtnInfo: newGoalBtnInfo });
    },

    // ‘制定目标’按钮
    bindNewGoalBtnTap: function() {
        console.log('制定目标');
        if (this.data.newGoalName.trim().length == 0) {
            return;
        }
        wx.setStorage({
            key: CACHE_KEY.GOAL,
            data: { 'GOAL_01': util.genNewGoal(this.data.newGoalName) },
            success: function(res) {
                // success
                wx.reLaunch({
                    url: 'pages/achive/achive'
                })
            },
            fail: function() {
                // fail
                console.error('保存失败');
            }
        })
    },

    onLoad: function() {
        console.log('new goal page onLoad');
        var that = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            });
        });
        var newGoalBtnInfo = util.genBtnInfo({
            btnType: 'default',
            text: '制定目标',
            handler: 'bindNewGoalBtnTap'
        });
        that.setData({
            newGoalBtnInfo: newGoalBtnInfo
        });
    }
})