/**
   * 格式化日期，传入日期对象Date， 再传入想要转化的日期模板字符串
   * 如 formatDate(new Date(time),'yyyy-MM-dd hh:mm:ss')；分隔符号可以修改，但对应字母一定要正确(月份大写M,分钟小写m)。
   */
  function DateForMat(date, fmt) {
    // let date = this;
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    var o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        var str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
      }
    }
    return fmt;
  }

  module.exports = {
    DateForMat,
  }