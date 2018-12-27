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
Array.prototype.objIndexOf = function (obj) {
  let id = obj._id;

};
