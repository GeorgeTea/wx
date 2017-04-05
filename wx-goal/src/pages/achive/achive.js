//achive.js
//获取应用实例
var app = getApp()
Page({
    data: {
        achive: '已坚持9天',
        userInfo: {},
        signInInfo: {},
        newGoalInfo: {},
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    bindSignIn: function() {
        console.log('打卡');
    },
    bindNewGoal: function() {
        console.log('新目标');
    },
    onLoad: function() {
        console.log('onLoad');
        var that = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        });
        that.setData({
            signInInfo: {
                btnType: 'primary',
                btnSize: 'default',
                text: '打卡',
                handler: 'bindSignIn'
            },
            newGoalInfo: {
                btnType: 'warn',
                btnSize: 'default',
                text: '新目标',
                handler: 'bindNewGoal'
            }
        });
    }
})