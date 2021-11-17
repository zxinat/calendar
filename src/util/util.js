import * as util from "../util/util";
export function formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
export function formatTimeMysql(val) {
    const date = new Date(val)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
export function turnDate(tmp) {
    const date = new Date(tmp)

    return date
}
export function formatDate(tmp) {
    const date = new Date(tmp)
    console.log(tmp);
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    // console.log(year, month, day);
    return `${[year, month + 1, day].map(formatNumber).join('-')} `
}
export function getWeek(tmp) {
    const date = new Date(tmp)
    var week = date.getDay(); //获取时间的星期数
    var minus = week ? week - 1 : 6;
    // console.log(minus);
    date.setDate(date.getDate() - minus);
    var d = date.getDate();
    const timeFrom = date.setDate(d)
    const timeEnd = date.setDate(d + 6)
    console.log(typeof timeFrom);
    return [d, d + 6]
}
export function getWeekRaw(tmp) {
    const date = new Date(tmp)

    console.log(date);
    var week = date.getDay(); //获取时间的星期数
    var minus = week ? week - 1 : 6;
    // console.log(minus);
    date.setDate(date.getDate() - minus);
    var d = date.getDate();

    return [d, d + 6]
}
export function getDay(tmp) {
    const date = new Date(tmp)
    var day = date.getDate();
    return day
}
export function getWeekDay(tmp) {
    const date = new Date(tmp)
    var day = date.getDay();
    var weekDay = '周日';
    switch (day) {
        case 1:
            weekDay = '周一';
            break;

        case 2:
            weekDay = '周二';
            break;
        case 3:
            weekDay = '周三';
            break;
        case 4:
            weekDay = '周四';
            break;
        case 5:
            weekDay = '周五';
            break;
        case 6:
            weekDay = '周六';
            break;
    }
    return weekDay
}

export function getDetail(cur, itinerarys) {
    var result = itinerarys;

    for (let i = 0; i < result.length; i++) {
        result[i].detail = {
            height: 0,
            top: 0
        }
        let curDate = util.turnDate(cur);
        let morning = curDate.setHours(0);
        let evening = curDate.setHours(24);
        let start = util.turnDate(itinerarys[i].start);
        let end = util.turnDate(itinerarys[i].end);
        // console.log(start, end);
        // console.log(curDate.setHours(0));
        // console.log(curDate.setHours(24));
        if (morning < start && evening < end && evening > start) {
            result[i].detail.top = start.getHours() * 50;
            result[i].detail.height = (24 - start.getHours()) * 50;
        } else if (morning > start && evening < end) {
            result[i].detail.top = 0;
            result[i].detail.height = 24 * 50;
        } else if (morning > start && evening > end && morning < end) {
            result[i].detail.top = 0;
            result[i].detail.height = end.getHours() * 50;
        } else if (morning < start && evening > end) {
            result[i].detail.top = start.getHours() * 50;
            result[i].detail.height = (end.getHours() - start.getHours()) * 50;
        }
    }
    return result
}
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : `0${n}`
}

// module.exports = {
//     formatTime
// }