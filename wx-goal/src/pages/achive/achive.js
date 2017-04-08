const CONST = require('../../utils/const');
const CACHE_KEY = CONST.CACHE_KEY;
var util = require('../../utils/util');

//achive.js
//获取应用实例
var app = getApp()
Page({
    data: {
        achiveInfo1: '目标[',
        achiveInfo2: ']已坚持',
        achiveInfo3: '天',
        goalName: null,
        keepDays: null,
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

    // ‘打卡’按钮事件
    bindSignIn: function() {
        var goal = wx.getStorageSync(CACHE_KEY.GOAL).GOAL_01;
        var lastRecordDay = goal[CACHE_KEY.LAST_RECORD_DAY] || '';
        var now = new Date();
        var today = util.formatDate(now);
        var yesterday = util.formatDate(util.caclDate(-1));
        if (today == lastRecordDay) {
            // today
            console.log('今日已打卡');
            return;
        } else if (yesterday == lastRecordDay) {
            // yesterday
            goal[CACHE_KEY.LAST_RECORD_DAY] = util.formatDate(now);
            goal[CACHE_KEY.KEEP_DAYS] = goal[CACHE_KEY.KEEP_DAYS] + 1;
            console.log('今日打卡');
        } else {
            goal[CACHE_KEY.LAST_RECORD_DAY] = util.formatDate(now);
            goal[CACHE_KEY.KEEP_DAYS] = 1;
            console.log('从头计算');
        }
        // 修改打卡按钮的状态
        var signInInfo = util.genBtnInfo({
            btnType: 'default',
            btnSize: 'default',
            text: '今日已打卡',
            handler: 'bindSignIn'
        });
        this.setData({
            keepDays: goal[CACHE_KEY.KEEP_DAYS],
            signInInfo: signInInfo
        });
        // 储存打卡信息
        wx.setStorage({
            key: CACHE_KEY.GOAL,
            data: {'GOAL_01': goal}
        });
        // console.log('打卡');
    },

    // ‘新目标’按钮事件
    bindNewGoal: function() {
        console.log('新目标');
        wx.navigateTo({
            url: '../goal/goal'
        })
    },

    onLoad: function() {
        console.log('achive page onLoad');
        var that = this;

        // 初始化用户信息
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            });
        });

        var now = new Date();
        var today = util.formatDate(now);
        var yesterday = util.formatDate(util.caclDate(-1));
        var goal = wx.getStorageSync(CACHE_KEY.GOAL).GOAL_01;
        var lastRecordDay = goal[CACHE_KEY.LAST_RECORD_DAY] || '';

        // 初始化目标信息
        var goalName = goal[CACHE_KEY.GOAL_NAME].length > 5 ? goal[CACHE_KEY.GOAL_NAME].substring(0, 5) + '...' : goal[CACHE_KEY.GOAL_NAME];
        var keepDays = today == lastRecordDay || yesterday == lastRecordDay ? goal[CACHE_KEY.KEEP_DAYS] : 0;

        // 判断‘打开’按钮的状态
        var signInInfo = today == lastRecordDay ? util.genBtnInfo({
            text: '今日已打卡',
            handler: 'bindSignIn'
        }) : util.genBtnInfo({
            btnType: 'primary',
            text: '打卡',
            handler: 'bindSignIn'
        });

        // 初始化‘新目标’按钮
        var newGoalInfo = util.genBtnInfo({
            btnType: 'warn',
            btnSize: 'default',
            text: '新目标',
            handler: 'bindNewGoal'
        });

        that.setData({
            goalName: goalName,
            keepDays: keepDays,
            signInInfo: signInInfo,
            newGoalInfo: newGoalInfo,
        });
    }
})