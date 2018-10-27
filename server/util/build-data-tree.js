/**
 * 递归生成数据树
 * @param data 传进来的数据数组
 * @param childName 数据数组项目里面的子数组的名称
 */
function buildTree(data,childName) {
  console.log(childName);
  let Tree = [];
  for(let i=0;i<data.length;i++){
    let node = data[i];
    if(node[childName].length > 0){
      // // 遍历对象
      // for(let key in node){
      //
      // }
      node[childName] = buildTree(node[childName]);
      Tree.push(node);
    }
  }
  return Tree;
}
let data = [{
  id:"1",
  children:[{id:2},{id:3}]
},
]
buildTree()
