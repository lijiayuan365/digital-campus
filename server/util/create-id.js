function createId(){
  let date = new Date();
  return `${date.getHours()}${date.getSeconds()}`;
};

// console.log(createId());
Date.prototype.ddd = 'fff'
let date = new Date('2016-08-09 12:13');
console.log(date.ddd);

let str = 'aaddccc';
let reg= / (aa)(dd)(ccc)/g;
let str1 = str.replace(reg,function(e){
  debugger
});

module.exports = createId;