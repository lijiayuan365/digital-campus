Array.prototype.pushNoRepeat = function () {
  let flag = false;
  for (let i = 0; i < arguments.length; i++) {
    let ele = arguments[i];
    if (this.indexOf(ele) === -1) {
      this.push(ele);
      flag = true;
    }
  }
  return flag
};
Array.prototype.ToList = function () {
  if(!this.length) {
    return null
  }

  let node = {};
  let head = {data: this[0], childNode: null};
  let pNode = head;  //pnode变量用来保存前一个节点

  for(let i = 1; i < this.length; i++) {
    node = {data: this[i], childNode:null};
    pNode.childNode = node;   //将前一个节点的next指向当前节点
    pNode = node;   //将node赋值给pnode
  }
  return head;
};
function Array2List(ary) {
  if(!ary.length) {
    return null
  }

  let node = {};
  let head = {value: ary[0], next: null};
  let pNode = head;  //pnode变量用来保存前一个节点

  for(let i = 1; i < ary.length; i++) {
    node = {value: ary[i], next:null};
    pNode.next = node;   //将前一个节点的next指向当前节点
    pNode = node;   //将node赋值给pnode
  }
  return head;
}

// 格式化日期
//定义时间格式化(maquanyang 2015-10-20)
Date.prototype.Format = function(fmt)
{ //author: meizz
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}
/**
 * 格式化日期，传入日期对象Date， 再传入想要转化的日期模板字符串
 * 如 formatDate(new Date(time),'yyyy-MM-dd hh:mm:ss')；分隔符号可以修改，但对应字母一定要正确(月份大写M,分钟小写m)。
 */
function getFormatDate(date, fmt) {
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
