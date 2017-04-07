function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function formatDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    return [year, month, day].map(formatNumber).join('');
}

function caclDate(addDayCount) {
    var day = new Date();
    day.setDate(day.getDate() + addDayCount);
    return day;
}

function genBtnInfo(btnInfo) {
    Object.assign({
        btnType: 'default',
        btnSize: 'default',
        text: '按钮'
    }, btnInfo);
}

module.exports = {
    formatTime: formatTime,
    formatDate: formatDate,
    caclDate: caclDate,
    genBtnInfo: genBtnInfo,
}