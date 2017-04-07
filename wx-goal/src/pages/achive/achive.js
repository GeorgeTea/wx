const CONST = require('../../utils/const');
const CACHE_KEY = CONST.CACHE_KEY;
var util = require('../../utils/util');

//achive.js
//获取应用实例
var app = getApp()
Page({
    data: {
        achive: '坚持就是胜利',
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

    //打卡按钮
    bindSignIn: function() {
        var goal = wx.getStorageSync(CACHE_KEY.GOAL);
        // goal = {
        //     'GOAL_01': {
        //         'GOAL_NAME': '目标01',
        //         'LAST_RECORD_DAY': '20170406',
        //         'KEEP_DAYS': 10
        //     }
        // };
        var lastRecordDay = goal.GOAL_01[CACHE_KEY.LAST_RECORD_DAY] || '';
        var now = new Date();
        var yesterday = util.caclDate(-1);
        if (util.formatDate(now) == lastRecordDay) {
            // today
            console.log('今日已打卡');
            return;
        } else if (util.formatDate(yesterday) == lastRecordDay) {
            // yesterday
            goal.GOAL_01[CACHE_KEY.LAST_RECORD_DAY] = util.formatDate(now);
            goal.GOAL_01[CACHE_KEY.KEEP_DAYS] = goal.GOAL_01[CACHE_KEY.KEEP_DAYS] + 1;
            console.log('今日打卡');
        } else {
            goal.GOAL_01[CACHE_KEY.LAST_RECORD_DAY] = util.formatDate(now);
            goal.GOAL_01[CACHE_KEY.KEEP_DAYS] = 1;
            console.log('从头计算');
        }
        this.setData({
            signInInfo: {
                btnType: 'default',
                btnSize: 'default',
                text: '今日已打卡',
                handler: 'bindSignIn'
            }
        });
        // 修改打卡按钮的状态
        wx.setStorage({
            key: CACHE_KEY.GOAL,
            data: goal
        });
        // console.log('打卡');
    },

    //新目标按钮
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
            });
            wx.setStorage({
                key: CONST.CACHE_KEY.USER_INFO,
                data: userInfo
            });
        });

        // 初始化‘打开’按钮
        var now = new Date();
        var goal = wx.getStorageSync(CACHE_KEY.GOAL);
        var lastRecordDay = goal.GOAL_01[CACHE_KEY.LAST_RECORD_DAY] || '';
        if (util.formatDate(now) == lastRecordDay) {
            that.setData({
                signInInfo: {
                    btnType: 'default',
                    btnSize: 'default',
                    text: '今日已打卡',
                    handler: 'bindSignIn'
                }
            });
        } else {
            that.setData({
                signInInfo: {
                    btnType: 'primary',
                    btnSize: 'default',
                    text: '打卡',
                    handler: 'bindSignIn'
                }
            });
        }

        // 初始化‘新目标’按钮
        that.setData({
            newGoalInfo: {
                btnType: 'warn',
                btnSize: 'default',
                text: '新目标',
                handler: 'bindNewGoal'
            }
        });
    }
})