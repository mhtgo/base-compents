export const getLocalTime = function (time, format) {
    time = new Date(time)
    let o = {
        'M+': time.getMonth() + 1, // month
        'D+': time.getDate(), // day
        'h+': time.getHours(), // hour
        'm+': time.getMinutes(), // minute
        's+': time.getSeconds(), // second
        'q+': Math.floor((time.getMonth() + 3) / 3), // quarter
        'S': time.getMilliseconds() // millisecond
    }
    if (/(Y+)/.test(format)) {
        format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
    }
    return format
}

export const mGetDate = function (year, month) {
    var d = new Date(year, month, 0);
    return d.getDate();
}
